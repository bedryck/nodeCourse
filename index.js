const express = require('express')
const path = require('path')



const app = express()

app.get('/', (reg, res) => {
    res.status(200)
    res.sendFile(
        path.join(__dirname, 'views', 'index.html')
    )
})

app.get('/about', (reg, res) => {
    res.status(200)
    res.sendFile(
        path.join(__dirname, 'views', 'about.html')
    )
})






const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server started:', PORT)
})