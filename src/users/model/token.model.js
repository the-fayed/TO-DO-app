const mongoose = require(`mongoose`);
const tokenSchema = require("../schema/token.schema");

const token = mongoose.model(`token`, tokenSchema);

module.exports = token;
