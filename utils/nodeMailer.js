const nodemailer = require("nodemailer");
const keys = require("../keys");

module.exports = async function (mailOptions) {
  const transporter = nodemailer.createTransport({
    host: keys.SMTP_HOST,
    port: keys.SMTP_PORT,
    secure: true,
    auth: {
      user: keys.EMAIL_FROM,
      pass: keys.EMAIL_PASS,
    },
  });

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
