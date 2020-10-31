const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (reg, res) => {
    res.render('add')
})


router.post('/', async (reg, res) => {
    const { title, price, img } = reg.body

    const course = new Course(title, price, img)

    await course.save()

    res.redirect('/courses')
})


module.exports = router