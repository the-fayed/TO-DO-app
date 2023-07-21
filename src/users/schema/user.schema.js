const { Schema } = require("mongoose");
const bcrypt = require(`bcrypt`);

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [`admin`, `user`],
      default: `user`,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//hook to hash password pre save

userSchema.pre(`save`, async function (next) {
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

// hook to hash password pre update
userSchema.pre(`updateOne`, async function () {
  const updateObject = this.getUpdate();

  if (`password` in updateObject) {
    const hashedPassword = await bcrypt.hash(updateObject.password, 8);
    updateObject.password = hashedPassword;
  }
});

module.exports = userSchema;
