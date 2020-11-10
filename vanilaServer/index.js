const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {

    if (req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        if (req.url === '/') {
            fs.readFile(
                path.join(__dirname, 'views', 'index.html'),
                'utf-8',
                (err, content) => {
                    if (err) throw err

                    res.end(content)
                }
            )
        }

        if (req.url === '/about') {
            fs.readFile(
                path.join(__dirname, 'views', 'about.html'),
                'utf-8',
                (err, content) => {
                    if (err) throw err

                    res.end(content)
                }
            )
        }

        if (req.url === '/api/users') {
            res.writeHead(200, {
                'Content-Type': 'text/json; charset=utf-8'
            })

            const users = [
                { name: 'Roma', age: 23 },
                { name: 'Nika', age: 20 },
            ]

            res.end(JSON.stringify(users))
        }
    }

    if (req.method === 'POST') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        const body = []

        req.on('data', data => {
            body.push(Buffer.from(data))
        })

        req.on('end', () => {
            const message = body.toString().split('=')[1]

            res.end(`
            <h1>Ты написав ${message}</h1>
            `)
        })


    }



})

server.listen(3000, () => {
    console.log('server runnning')
})