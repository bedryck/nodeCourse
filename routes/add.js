const { Router } = require('express')

const router = Router()

router.get('/', (reg, res) => {
    res.render('add')
})


module.exports = router