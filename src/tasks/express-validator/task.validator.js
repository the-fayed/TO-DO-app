const { body, param } = require(`express-validator`);

const addTaskValidation = [
  body(`taskName`)
    .isString()
    .withMessage(`Task name must be a string!`)
    .notEmpty()
    .withMessage(`Task name is required!`),
  body(`description`)
    .isString()
    .withMessage(`Task description must be a string!`)
    .optional(),
  body(`completed`).isString().optional(),
  param(`createdBy`)
    .isEmpty()
    .withMessage(`failed creating task, invalid user id!`)
    .not()
    .isMongoId()
    .withMessage(`invalid id!`),
];

const updateTaskValidation = [
  param(`id`).not().isMongoId().withMessage(`Invalid Id!`),
  body(`taskName`)
    .isString()
    .withMessage(`Task name must be a string!`)
    .optional(),
  body(`description`)
    .isString()
    .withMessage(`Task description must be a string!`)
    .optional(),
  body(`completed`)
    .isBoolean()
    .withMessage(`completed value must be a boolean!`)
    .optional(),
];

const deleteTaskValidation = [
  param(`id`).isMongoId().withMessage(`Invalid Id!`),
];

module.exports = {
  addTaskValidation,
  deleteTaskValidation,
  updateTaskValidation,
};
