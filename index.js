const express = require('express')
const path = require('path')
const homeRoutes = require('./routes/home.js')
const addRoutes = require('./routes/add.js')
const coursesRoutes = require('./routes/courses.js')


const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use("/", homeRoutes)
app.use("/add", addRoutes)
app.use("/courses", coursesRoutes)




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server started:', PORT)
})