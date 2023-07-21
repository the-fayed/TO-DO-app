const {
  addTaskHandler,
  getAllTasksHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getTaskInfoHandler,
} = require("../controller/task.controller");
const validate = require(`../../../common/middleware/validationRequest`);
const isAuthorized = require(`../../../common/middleware/isAuthorized`);
const {
  addTaskValidation,
  deleteTaskValidation,
  updateTaskValidation,
} = require("../express-validator/task.validator");

const {
  GET_ALL_TASKS,
  GET_TASK_INFO,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_TASK,
} = require(`../endPoints`);

const router = require(`express`).Router();

router.post(
  `/api/v1/tasks/:id`,
  isAuthorized(ADD_TASK),
  validate(addTaskValidation),
  addTaskHandler
);
router.get(`/api/v1/tasks`, isAuthorized(GET_ALL_TASKS), getAllTasksHandler);
router.get(
  `/api/v1/tasks/:id`,
  isAuthorized(GET_TASK_INFO),
  getTaskInfoHandler
);
router.patch(
  `/api/v1/tasks/:id`,
  isAuthorized(UPDATE_TASK),
  validate(updateTaskValidation),
  updateTaskHandler
);
router.delete(
  `/api/v1/tasks/:id`,
  isAuthorized(DELETE_TASK),
  validate(deleteTaskValidation),
  deleteTaskHandler
);

module.exports = router;
