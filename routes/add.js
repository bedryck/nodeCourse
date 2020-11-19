const { Router } = require('express')
const Course = require('../models/course')
const router = Router()
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
    res.render('add')
})


router.post('/', auth, async (req, res) => {

    try {
        const { title, price, img, } = req.body
        const course = new Course({
            title,
            price,
            img,
            userId: req.user // Описали як Schema.Types.ObjectId
        })
        await course.save()
        res.redirect('/courses')

    } catch (error) {
        console.log(error)
    }


})


module.exports = router