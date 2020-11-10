const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {

    static async add(course) {
        const card = await Card.fetch()

        const indx = card.courses.findIndex(item => item.id === course.id)
        const canditate = card.courses[indx]

        if (canditate) {
            canditate.count++
            card.courses[indx] = canditate
        } else {
            course.count = 1
            card.courses.push(course)
        }

        card.price += +course.price

        return new Promise((res, rej) => {

            fs.writeFile(
                p,
                JSON.stringify(card),
                err => {
                    if (err) rej(err)
                    res()
                }
            )
        })
    }

    static async fetch() {

        return new Promise((res, rej) => {
            fs.readFile(p, 'utf-8',
                (err, content) => {
                    if (err) rej(err)

                    res(JSON.parse(content))

                }
            )
        })
    }

    static async remove(id) {
        const card = await Card.fetch()
        console.log("card", card)
        console.log("id", id)
        const indx = card.courses.findIndex(item => item.id === id)
        const course = card.courses[indx]

        if (course.count === 1) {
            card.courses = card.courses.filter(item => item.id !== id)
        } else {
            card.courses[indx].count--
        }

        card.price -= course.price

        return new Promise((res, rej) => {

            fs.writeFile(
                p,
                JSON.stringify(card),
                err => {
                    if (err) rej(err)
                    res(card)
                }
            )
        })
    }
}

module.exports = Card