const express = require('express')
const path = require('path')
const homeRoutes = require('./routes/home.js')
const addRoutes = require('./routes/add.js')
const coursesRoutes = require('./routes/courses.js')
const cardRoutes = require('./routes/card.js')
const mongoose = require('mongoose');




const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: true }))

app.use("/", homeRoutes)
app.use("/add", addRoutes)
app.use("/courses", coursesRoutes)
app.use("/card", cardRoutes)




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
        app.listen(PORT, () => {
            console.log('server started:', PORT)
        })

    } catch (error) {
        console.log(error)
    }
}

start()


