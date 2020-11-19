const { Router } = require('express')
const User = require('../models/user')
const router = Router()

router.get('/login', (req, res) => {
    res.render('auth/login')
})


router.get('/logout', (req, res) => {

    req.session.destroy(() => {

        res.redirect('/auth/login#login')

    })
})


router.post('/login', async (req, res) => {
    const user = await User.findById("5fb0711a494aab3b4c82634a")
    req.session.user = user
    req.session.isAuthenticated = true;

    req.session.save((err) => {
        if (err) {
            throw err
        }
        res.redirect('/')
    })
})


module.exports = router