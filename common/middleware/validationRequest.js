const { validationResult, ValidationChain } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Validation Error!`, data: errors.array() });
  };
};

module.exports = validate;
