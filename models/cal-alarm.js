const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

const calAlarmSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  unit: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: () => moment().format("l"),
  },
});

module.exports = mongoose.model("CalAlarm", calAlarmSchema);
