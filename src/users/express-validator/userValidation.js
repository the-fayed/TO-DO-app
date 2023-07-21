const { body, param, matchedData } = require("express-validator");

const addUserValidation = [
  body(`firstName`)
    .not()
    .isEmpty()
    .withMessage(`first name is required!`)
    .isString()
    .withMessage(`first name must be a string!`),
  body(`lastName`)
    .not()
    .isEmpty()
    .withMessage(`last name is required!`)
    .isString()
    .withMessage(`last name must be a string!`),
  body(`email`)
    .not()
    .isEmpty()
    .withMessage(`email is required!`)
    .isEmail()
    .withMessage(`invalid email!`),
  body(`password`).not().isEmpty().withMessage(`password is required!`),
  body(`role`)
    .not()
    .isEmpty()
    .withMessage(`role is required!`)
    .isString(`role must be a string!`),
  body(`verified`)
    .not()
    .isEmpty()
    .withMessage(`verified section is required!`)
    .isBoolean()
    .withMessage(`verified section must be a boolean!`),
];

const updateUserValidation = [
  param(`id`).not().isMongoId().withMessage(`Invalid user id!`),
  body(`firstName`, `lastName`)
    .not()
    .isEmpty()
    .withMessage(`first name and last name are required!`)
    .not()
    .isString()
    .withMessage(`first name and last name must be a string!`)
    .optional(),
  body(`password`)
    .not()
    .isEmpty()
    .withMessage(`password is required`)
    .optional(),
];

const loginValidation = [
  body(`email`)
    .isEmail()
    .withMessage(`Invalid email!`)
    .not()
    .isEmpty()
    .withMessage(`email is required!`),
  body(`password`).not().isEmpty().withMessage(`password is required!`),
];

const singUpValidation = [
  body(`firstName`)
    .not()
    .isEmpty()
    .withMessage(`first name is required!`)
    .isString()
    .withMessage(`first name must be a string!`),
  body(`lastName`)
    .not()
    .isEmpty()
    .withMessage(`last name is required!`)
    .isString()
    .withMessage(`last name must be a string!`),
  body(`email`)
    .not()
    .isEmpty()
    .withMessage(`email is required!`)
    .isEmail()
    .withMessage(`invalid email!`),
  body(`password`)
    .not()
    .isEmpty()
    .withMessage(`password is required!`)
    .isString()
    .withMessage(
      `Password must contains at least: 6 numbers, 1 uppercase character, and 1 lowercase character!`
    ),
];

module.exports = {
  addUserValidation,
  updateUserValidation,
  loginValidation,
  singUpValidation,
};
