
const password = "OZykR0im2W78NsXY"
const dbName = "nodeCourse"

module.exports = {
    urlDb: `mongodb+srv://roman:${password}@cluster0.jxmkb.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    sessionSecret: 'some secret value',
    EMAIL_FROM: "roma_kovalbest@ukr.net",
    BASE_URL: 'http://localhost:3000/'

}