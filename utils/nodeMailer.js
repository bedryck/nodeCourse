const nodemailer = require('nodemailer');



module.exports = async function (mailOptions) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ukr.net',
        port: 2525,
        secure: true,
        auth: {
            user: 'roma_kovalbest@ukr.net',
            pass: 'ClwQJLETMz5Pq8XS'
        }
    });

    return transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

