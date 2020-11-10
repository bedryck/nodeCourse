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
            console.log(p)
            fs.readFile(p, 'utf-8',
                (err, content) => {
                    if (err) rej(err)

                    res(JSON.parse(content))

                }
            )
        })
    }
}

module.exports = Card