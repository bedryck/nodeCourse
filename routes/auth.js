const { Router } = require('express')
const router = Router()

router.get('/login', (req, res) => {
    res.render('auth/login')
})





module.exports = router