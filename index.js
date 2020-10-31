const express = require('express')
const path = require('path')



const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (reg, res) => {
    res.render('index')
})

app.get('/add', (reg, res) => {
    res.render('add')
})

app.get('/courses', (reg, res) => {
    res.render('courses')
})










const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server started:', PORT)
})