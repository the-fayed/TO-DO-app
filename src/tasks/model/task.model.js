const mongoose = require(`mongoose`);
const taskSchema = require("../schema/task.schema");

const task = mongoose.model(`task`, taskSchema);

module.exports = task;