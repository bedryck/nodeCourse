// служить для роботи з файлами і папками file system
const fs = require('fs')
const path = require("path")

// fs.mkdir(path.join(__dirname, 'notes'), (err) => { // створє папку
//     if (err) throw err

//     console.log('папка створена')

// })

// fs.writeFile(path.join(__dirname, 'notes', 'myNotes.txt'), // створє file
//     'Hello world',
//     (err) => {
//         if (err) throw err

//         console.log('файл створений')

//         fs.appendFile(   // записує до файлу
//             path.join(__dirname, 'notes', 'myNotes.txt'),
//             "From append file",
//             (err) => {
//                 if (err) throw err
//                 console.log('файл змінений')

//             }
//         )

//     }
// )


// fs.readFile( // зчитує файл 
//     path.join(__dirname, 'notes', 'myNotes.txt'),
//     'utf-8',
//     (err, data) => {
//         if (err) throw err
//         console.log(data)
//     }
// )

fs.rename(
    path.join(__dirname, 'notes', 'myNotes.txt'),
    path.join(__dirname, 'notes', 'myNotes2.txt'),
    err => {
        if (err) throw err
        console.log('файл перейменований')
    }
)