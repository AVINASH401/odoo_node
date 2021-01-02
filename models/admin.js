const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  picture: {
    type: String,
  },
  role: {
    type: String,
  },
  date: {
    type: String,
    default: () => moment().format("l"),
  },
});

module.exports = mongoose.model("Admin", adminSchema);
