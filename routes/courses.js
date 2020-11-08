const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (reg, res) => {
    const courses = await Course.getAll()
    res.render('courses', { courses })
})


router.get('/:id', async (reg, res) => {
    const course = await Course.getById(reg.params.id)
    res.render('course', { course })
})


module.exports = router