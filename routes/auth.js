const { Router } = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const User = require('../models/user')
const router = Router()
const nodemailer = require('../utils/nodeMailer')
const regEmail = require('../emails/registration')
const resetEmail = require('../emails/reset')

router.get('/login', (req, res) => {


    res.render('auth/login', {
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
})


router.get('/logout', (req, res) => {


    req.session.destroy(() => {

        res.redirect('/auth/login#login')

    })
})


router.post('/login', async (req, res) => {
    const { email, password, } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
        const areSame = await bcrypt.compare(password, candidate.password)
        if (areSame) {

            req.session.user = candidate
            req.session.isAuthenticated = true;
            req.session.save((err) => {
                if (err) {
                    throw err
                }
                res.redirect('/')
            })
        } else {
            req.flash('loginError', "Не вірний пароль")
            res.redirect('/auth/login#login')
        }
    } else {
        req.flash('loginError', "Такого користувача не існує")
        res.redirect('/auth/login#login')
    }

})

router.post('/register', async (req, res) => {

    try {
        const { email, password, name } = req.body

        const candidate = await User.findOne({ email })
        if (candidate) {
            req.flash('registerError', "Користувач з таким email уже існує")
            res.redirect('/auth/login#register')
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = new User({
                email, name, password: hashPassword, cart: { items: [] }
            })
            await user.save()
            res.redirect('/auth/login#login')
            nodemailer(regEmail(email))
        }
    } catch (error) {
        console.log(error)
    }
})


router.get('/reset', (req, res) => {


    res.render('auth/reset', {
        error: req.flash('error'),
    })
})

router.get('/password/:token', async (req, res) => {


    if (!req.params.token) {
        return res.redirect('/auth/login')
    }
    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: { $gt: Date.now() }
        })
        if (!user) {
            return res.redirect('/auth/login')
        }

        res.render('auth/password', {
            error: req.flash('error'),
            userId: user._id.toString(),
            token: req.params.token
        })

    } catch (error) {
        console.log(error)
    }


})


router.post('/reset', async (req, res) => {

    try {
        const { email } = req.body

        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                req.flash('error', 'Упс, щось пішло не так. Спробуйте пізніше.')
                return res.redirect('/auth/reset')
            }

            const token = buffer.toString('hex')
            const candidate = await User.findOne({ email })

            if (candidate) {
                candidate.resetToken = token
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
                await candidate.save()

                nodemailer(resetEmail(email, token))
                return res.redirect('/auth/login')

            } else {
                req.flash('error', "Такого email немає")
                return res.redirect('/auth/reset')

            }

        })


    } catch (error) {
        console.log(error)
    }
})

router.post('/password', async (req, res) => {

    try {
        const { password, userId, token, } = req.body

        const user = await User.findOne({
            _id: userId,
            resetToken: token,
            resetTokenExp: { $gt: Date.now() }
        })

        if (!user) {
            req.flash('loginError', 'Час для відновлення пароля закінчився')
            return res.redirect('/auth/login')
        }

        user.password = await bcrypt.hash(password, 10)
        user.resetToken = undefined
        user.resetTokenExp = undefined
        await user.save()
        res.redirect('/auth/login')

    } catch (error) {
        console.log(error)
    }
})





module.exports = router