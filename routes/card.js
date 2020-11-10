const { Router } = require('express')
const Course = require('../models/course')
const Card = require('../models/card')

const router = Router()

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id)
    await Card.add(course)
    res.redirect('/card')
})


router.get('/', async (req, res) => {
    const card = await Card.fetch()
    const { courses, price } = card

    res.render('card', { courses, price })
})





module.exports = router