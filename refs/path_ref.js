// Данний модуль служить для того щоб працювати з шляхами в node js

const path = require('path')
console.log(__filename) // D:\home\nodeCurse\refs\path_ref.js
console.log(__dirname) // D:\home\nodeCurse\refs
console.log(path.basename(__filename)) // - виводить назву файла path_ref.js
console.log(path.dirname(__filename)) // виводить абсолютний шлях D:\home\nodeCurse\refs
console.log(path.extname(__filename)) // виводить розширення файлу .js

console.log(path.parse(__filename)) //  виводить об'єкт {
                                                    //     root: 'D:\\',
                                                    //     dir: 'D:\\home\\nodeCurse\\refs',
                                                    //     base: 'path_ref.js',
                                                    //     ext: '.js',
                                                    //     name: 'path_ref'
                                                    //   }
console.log(path.join(__dirname, 'test', 'second.html')) //D:\home\nodeCurse\refs\test\second.html
console.log(path.resolve(__dirname, './test', 'second.html')) // D:\home\nodeCurse\refs\test\second.html


// path використовують для того щоб виправити помилки в випадковому написанні шляху також це фіксить проблему 
// з шляхами на різних операційних системах ../../../ vs \..\..\