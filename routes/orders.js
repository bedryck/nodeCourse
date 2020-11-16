const { Router } = require('express')
const Order = require('../models/order')
const router = Router()

router.get('/', async (req, res) => {


    try {

        const orders = await Order.find({
            'user.userId': req.user._id
        }).populate('user.userId')

        res.render('orders', {
            orders: orders.map(item => {
                return {
                    ...item._doc,
                    price: item.courses.reduce((total, course) => {
                        return total += course.course.price * course.count
                    }, 0)
                }
            })
        })
    } catch (error) {
        console.log(error)
    }

})


router.post('/', async (req, res) => {

    try {

        const user = await req.user.populate('cart.items.courseId').execPopulate()

        const courses = user.cart.items.map(item => ({
            count: item.count,
            course: { ...item.courseId._doc }
        }))


        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            courses
        })

        await order.save()
        await req.user.clearCart()

        res.redirect('/orders')


    } catch (error) {
        console.log(error)
    }


})






module.exports = router