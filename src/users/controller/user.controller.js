const { StatusCodes } = require("http-status-codes");
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const User = require(`../model/user.model`);
const crypto = require(`crypto`);
const Token = require(`../model/token.model`);
const sendEmail = require(`../../../common/services/sendEmail`);

exports.addUserHandler = async (req, res) => {
  const { firstName, lastName, email, password, role, verified } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (!exist) {
      let user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
        verified,
      });
      res
        .status(StatusCodes.OK)
        .json({ message: `Create success!`, data: user });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Email already existed!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, data: error });
  }
};

exports.getAllUsersHandler = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json({ message: `Success!`, data: users });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, data: error });
  }
};

exports.getUserInfoHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id }).select(`-password`);
    if (user) {
      res
        .status(StatusCodes.OK)
        .json({ message: `${user.firstName}'s profile!`, data: user });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `User not found!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
  }
};

exports.updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, password } = req.body;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Invalid ID!`, data: id });
    } else {
      const updated = await User.updateOne(
        { _id: id },
        {
          firstName,
          lastName,
          password,
        },
        { new: true }
      );
      if (updated) {
        res.status(StatusCodes.OK).json({
          message: `Updated user profile successfully!`,
          data: updated,
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Error while updating user profile` });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
  }
};

exports.deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      const user = await User.deleteOne({ _id: id });
      if (user.deletedCount > 0) {
        res
          .status(StatusCodes.OK)
          .json({ message: `User deleted successfully!`, data: id });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Error while deleting this user!`, data: user });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Invalid Id!` });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, data: error });
  }
};

exports.loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Email Invalid!` });
    } else if (!user.verified) {
      const token = await Token.findOne({ userId: user._id });
      if (!token) {
        const token = await Token.create({
          userId: user._id,
          token: crypto.randomBytes(32).toString(`hex`),
        });
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token}`;
        const template = `<h1>Email Verification</h1>
            <h3>Welcome to our TO-DO app!</h3>
            <p> To verify your email please click this link <a href="${url}">verify now</a></p>`;
        await sendEmail(user.email, `Email verification`, template);
        res.status(StatusCodes.OK).json({
          message: `A verification email was sent to you, please check your email!`,
        });
      } else if (token) {
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token}`;
        const template = `<h1>Email Verification</h1>
            <h3>Welcome to our TO-DO app!</h3>
            <p> To verify your email please click this link <a href="${url}">verify now</a></p>`;
        await sendEmail(user.email, `Email verification`, template);
        res.status(StatusCodes.OK).json({
          message: `A verification email was sent to you, please check your email!`,
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `An expected error, please try again later!` });
      }
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            id: user._id,
            role: user.role,
            verified: user.verified,
          },
          process.env.SECRET_KEY,
          { expiresIn: process.env.EXPIRATION_PERIOD }
        );
        res.status(StatusCodes.OK).json({ message: `Login success!`, token });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Invalid password!` });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, data: error });
    console.log(error);
  }
};

exports.singUpHandler = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Email already exist!` });
    } else {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
      const token = await Token.create({
        userId: newUser._id,
        token: crypto.randomBytes(32).toString(`hex`),
      });
      const url = `${process.env.BASE_URL}users/${newUser._id}/verify/${token}`;
      const template = `<h1>Email Verification</h1>
<h3>Welcome to our TO-DO app!</h3>
<p> To verify your email please click this link <a href="${url}">verify now</a></p>`;
      await sendEmail(newUser.email, `Email Verification`, template);
      res.status(StatusCodes.OK).json({
        message: `A verification email was sent to you!`,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error });
    console.log(error);
  }
};

exports.verifyEmailHandler = async (req, res) => {
  const { id, token } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Invalid link!` });
    }
    const userToken = await Token.findOne({ userId: id, token: token });
    if (!token) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: `Invalid link!` });
    }
    await User.updateOne({ _id: id }, { verified: true });
    await Token.deleteOne({ userId: id });
    res
      .status(StatusCodes.OK)
      .json({ message: `Email verified successfully!` });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error!`, error: error });
  }
};
