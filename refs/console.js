function consoleToJSON() {
    const c = {}

    for (let index = 2; index < process.argv.length; index++) {
        const element = process.argv[index].split('=');
        c[element[0]] = element[1] || true
    }

    return c
}

console.log(consoleToJSON())
// console.log(process)

// дістати додаткові параметри з консолі для прикладу node console.js message=hello go => { message: 'hello', go: true }