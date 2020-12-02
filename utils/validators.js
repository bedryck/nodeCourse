const { body } = require("express-validator");
const User = require("../models/user");

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
    }),
  body("password", "Пароль повинен бути мінімум 6 символів")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric(),
  body("confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Паролі не співпадають");
    }

    return true;
  }),
  body("name").isLength({ min: 3 }).withMessage("Ім'я не менше 3 символів"),
];
