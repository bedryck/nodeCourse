const { Router } = require('express')
const Course = require('../models/course')
const { validationResult } = require("express-validator");
const router = Router()
const auth = require('../middleware/auth')
const { courseValidator } = require('../utils/validators')

router.get('/', auth, (req, res) => {
    res.render('add')
})


router.post('/', auth, courseValidator, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('add', {
            errors: errors.array()[0].msg,
            data: { title: req.body.title, price: req.body.price, img: req.body.img, }
        });
    }


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