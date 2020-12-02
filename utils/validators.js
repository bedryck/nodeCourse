const { body } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Введіть валідний email")
    .custom(async (value) => {
      try {
        const candidate = await User.findOne({ email: value });
        if (candidate) {
          return Promise.reject("Користувач з таким email уже існує");
        }
      } catch (error) {
        console.log(error);
      }
    }).normalizeEmail(),
  body("password", "Пароль повинен бути мінімум 6 символів")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric().trim(),
  body("confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Паролі не співпадають");
    }

    return true;
  }).trim(),
  body("name").isLength({ min: 3 }).withMessage("Ім'я не менше 3 символів").trim(),
];


exports.loginValidators = [
  body("email")
    .isEmail()
    .withMessage("Введіть валідний email")
    .custom(async (value) => {
      try {
        const candidate = await User.findOne({ email: value });
        if (!candidate) {
          return Promise.reject("Такого користувача не існує");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .custom(async (value, { req }) => {
      try {
        const candidate = await User.findOne({ email: value });
        const areSame = await bcrypt.compare(req.body.password, candidate.password);
        if (!areSame) {
          return Promise.reject("Не вірний пароль");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .normalizeEmail(),
  body("password", "Пароль повинен бути мінімум 6 символів")
    .isLength({ min: 4, max: 56 })
    .isAlphanumeric().trim(),

];


exports.courseValidator = [
  body("title", "Нащва повина бути мінімум 6 символів").isLength({ min: 6, max: 56 }).trim(),
  body("price").isNumeric().withMessage('Введіть валідну ціну'),
  body("img").isURL().withMessage('Введіть валідний url')


];