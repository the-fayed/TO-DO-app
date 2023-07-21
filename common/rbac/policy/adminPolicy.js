const {
  GET_ALL_USERS,
  DELETE_USER,
  UPDATE_USER,
  GET_USER_INFO,
  ADD_USER,
} = require(`../../../src/users/endPoints`);

const { GET_ALL_TASKS } = require(`../../../src/tasks/endPoints`);

module.exports = [
  GET_ALL_USERS,
  DELETE_USER,
  UPDATE_USER,
  GET_USER_INFO,
  ADD_USER,
  GET_ALL_TASKS,
];
