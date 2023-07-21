const {
  addUserHandler,
  updateUserHandler,
  getAllUsersHandler,
  deleteUserHandler,
  loginHandler,
  getUserInfoHandler,
  singUpHandler,
  verifyEmailHandler,
} = require("../controller/user.controller");

const validate = require(`../../../common/middleware/validationRequest`);
const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const {
  addUserValidation,
  loginValidation,
  updateUserValidation,
  singUpValidation,
} = require("../express-validator/userValidation");
const {
  GET_ALL_USERS,
  GET_USER_INFO,
  UPDATE_USER,
  DELETE_USER,
  ADD_USER,
} = require("../endPoints");
const router = require(`express`).Router();

router.post(
  `/api/v1/users`,
  isAuthorized(ADD_USER),
  validate(addUserValidation),
  addUserHandler
);
router.get(`/api/v1/users`, isAuthorized(GET_ALL_USERS), getAllUsersHandler);
router.get(
  `/api/v1/users/:id`,
  isAuthorized(GET_USER_INFO),
  getUserInfoHandler
);
router.patch(
  `/api/v1/users/:id`,
  isAuthorized(UPDATE_USER),
  validate(updateUserValidation),
  updateUserHandler
);
router.delete(
  `/api/v1/users/:id`,
  isAuthorized(DELETE_USER),
  deleteUserHandler
);
router.post(`/api/v1/auth`, validate(loginValidation), loginHandler);
router.post(`/api/v1/signup`, validate(singUpValidation), singUpHandler);
router.get(`/api/v1/users/:id/verify/:token`, verifyEmailHandler);

module.exports = router;
