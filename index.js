const express = require('express')
const path = require('path')
const homeRoutes = require('./routes/home.js')
const addRoutes = require('./routes/add.js')
const coursesRoutes = require('./routes/courses.js')
const cardRoutes = require('./routes/card.js')
const orderRoutes = require('./routes/orders.js')
const mongoose = require('mongoose');
const User = require('./models/user')



const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(async (req, res, next) => {

    try {
        const user = await User.findById("5fb0711a494aab3b4c82634a")
        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }

})


app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: true }))

app.use("/", homeRoutes)
app.use("/add", addRoutes)
app.use("/courses", coursesRoutes)
app.use("/card", cardRoutes)
app.use("/orders", orderRoutes)


const PORT = process.env.PORT || 3000


async function start() {
    try {
        const password = "OZykR0im2W78NsXY"
        const dbName = "nodeCourse"
        const urlDb = `mongodb+srv://roman:${password}@cluster0.jxmkb.mongodb.net/${dbName}?retryWrites=true&w=majority`
        await mongoose.connect(urlDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        const candidate = await User.findOne()
        if (!candidate) {
            const user = new User({
                email: 'romariooo27@gmail.com',
                name: 'Roman',
                cart: { items: [] }
            })
            await user.save()
        }

        app.listen(PORT, () => {
            console.log('server started:', PORT)
        })

    } catch (error) {
        console.log(error)
    }
}

start()


