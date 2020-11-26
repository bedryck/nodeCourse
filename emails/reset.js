const keys = require('../keys')

module.exports = function (email, token) {
    return {
        from: keys.EMAIL_FROM,
        to: email,
        subject: 'Відновлення пароля',
        html: `
        <h1>
        Ви забули пароль
        </h1>
        <p>
            Якщо ні, то проігноруйте данний лист
        </p>
        <p>
            Інакше нажміть на посилання нижче
        </p>
        <p>
            <a href="${keys.BASE_URL}auth/password/${token}">Відновити пароль</a>
        </p>
        <hr />
        <a href="${keys.BASE_URL}">Магазин курсів</a>
        `
    }
}