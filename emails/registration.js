const keys = require('../keys')

module.exports = function (email) {
    return {
        from: keys.EMAIL_FROM,
        to: email,
        subject: 'Акаунт створений',
        html: `
        <h1>
        Ласкаво просимо в наш магазин
        </h1>
        <p>
        Ви успішно створили акаунт з email - ${email}
        </p>
        <hr />
        <a href="${keys.BASE_URL}">Магазин курсів</a>
        `
    }
}