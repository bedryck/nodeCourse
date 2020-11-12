const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
    const courses = await Course.find()
    res.render('courses', { courses })
})


router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    res.render('course', { course })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }
    const course = await Course.findById(req.params.id)
    res.render('course-edit', { course })
})


router.post('/edit', async (req, res) => {
    const { title, price, img, id } = req.body

    await Course.findByIdAndUpdate(id, { title, price, img })
    res.redirect('/courses')
})


module.exports = router