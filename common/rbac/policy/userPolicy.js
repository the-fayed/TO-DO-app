const { GET_USER_INFO, UPDATE_USER } = require(`../../../src/users/endPoints`);
const {
  GET_ALL_TASKS,
  GET_TASK_INFO,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_TASK,
} = require(`../../../src/tasks/endPoints`);

module.exports = [
  GET_USER_INFO,
  UPDATE_USER,
  GET_ALL_TASKS,
  GET_TASK_INFO,
  UPDATE_TASK,
  DELETE_TASK,
  ADD_TASK,
];
