const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = Router()

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
        }
    } catch (error) {
        console.log(error)
    }


})


module.exports = router