const { Router } = require('express')

const router = Router()

router.get('/', (reg, res) => {
    res.render('courses')
})



module.exports = router