const { StatusCodes } = require(`http-status-codes`);
const Task = require(`../model/task.model`);
const User = require(`../../users/model/user.model`);

exports.addTaskHandler = async (req, res) => {
  const { id } = req.params;
  const { taskName, description, completed } = req.body;
  try {
    const exist = await Task.findOne({ taskName });
    if (exist) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Task already exist!`, data: exist });
    } else {
      const task = await Task.create({
        taskName,
        description,
        completed,
        createdBy: id,
      });
      res
        .status(StatusCodes.OK)
        .json({ message: `Create Success!`, data: task });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, data: error });
    console.log(error);
  }
};

exports.getAllTasksHandler = async (req, res) => {
  const { id } = req.headers;
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      const tasks = await Task.find({ createdBy: id }).select(`-createdBy`);
      if (tasks) {
        res.status(StatusCodes.OK).json({ message: `Success!`, data: tasks });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({ message: `No tasks yet!` });
      }
    } else
      res.status(StatusCodes.BAD_REQUEST).json({ message: `user not found` });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, data: error });
  }
};

exports.getTaskInfoHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id });
    if (!task) {
      res.status(StatusCodes.NOT_FOUND).json({ message: `Task not found!` });
    } else {
      res.status(StatusCodes.OK).json({ message: `Success!`, data: task });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, data: error });
  }
};

exports.updateTaskHandler = async (req, res) => {
  const { id } = req.params;
  const { taskName, description, completed } = req.body;
  try {
    const task = await Task.findOne({ _id: id });
    if (task) {
      const updated = await Task.updateOne(
        { _id: id },
        {
          taskName,
          description,
          completed,
        }
      );
      if (updated.modifiedCount > 0) {
        res
          .status(StatusCodes.OK)
          .json({ message: `Update Success!`, data: updated });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Update unsuccess!` });
      }
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: `Task not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, data: error });
  }
};

exports.deleteTaskHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id });
    if (task) {
      let deleted = await Task.deleteOne({ _id: id });
      if (deleted.deletedCount > 0) {
        res
          .status(StatusCodes.OK)
          .json({ message: `Delete Success!`, data: deleted });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Delete Unsuccess!`, data: deleted });
      }
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Task not found!`, data: id });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, data: error });
  }
};
