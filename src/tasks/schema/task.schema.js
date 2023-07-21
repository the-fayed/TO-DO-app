const { Schema } = require(`mongoose`);

const taskSchema = new Schema(
  {
    taskName: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = taskSchema;

//hook to capitalize the first character on taskName
