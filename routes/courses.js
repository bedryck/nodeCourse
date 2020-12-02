const { Router } = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const { validationResult } = require("express-validator");
const { courseValidator } = require('../utils/validators')

const router = Router()

router.get('/', async (req, res) => {

    try {
        const courses = await Course.find().populate("userId", "email name")
        res.render('courses', { 
            courses,
            userId: req?.user._id.toString() || null
        
        })
        
    } catch (error) {
        console.log(error)
    }
})


router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    res.render('course', { course })
})

router.get('/:id/edit', auth, async (req, res) => {
    try {
        if (!req.query.allow) {
            return res.redirect('/')
        }

        
        const course = await Course.findById(req.params.id)
        if(course.userId.toString() !== req.user._id.toString()){
           return res.redirect('/courses')

        }
        res.render('course-edit', { course })
        
    } catch (error) {
        console.log(error)
    }
  
})


router.post('/edit', auth, courseValidator, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).redirect(`/courses/${req.body.id}/edit?allow=true`);
    }

    try {
        const { title, price, img, id } = req.body
    
        if(id.toString() === req.user._id.toString()){
            return res.redirect('/courses')
         }

        await Course.findByIdAndUpdate(id, { title, price, img })
        res.redirect('/courses')
        
    } catch (error) {
        console.log(error)
    }   
})

router.post('/remove', auth, async (req, res) => {
    try {
        await Course.deleteOne({ 
            _id: req.body.id,
            userId: req.user._id
        })
        res.redirect('/courses')
    } catch (error) {
        console.log(error)
    }

})




module.exports = router