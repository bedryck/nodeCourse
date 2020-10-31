const { Router } = require('express')

const router = Router()

router.get('/', (reg, res) => {
    res.render('index')
})



module.exports = router