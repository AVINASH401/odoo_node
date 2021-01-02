const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

const calendarSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "",
  },
  start: { type: String },

  end: { type: String },

  color: {
    primary: { type: String },
    secondary: { type: String },
  },

  duration: {
    type: String,
  },

  allDay: { type: Boolean, default: false },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contacts",
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contacts",
    },
  ],
  date: {
    type: String,
    default: () => moment().format("l"),
  },
});

module.exports = mongoose.model("Calendar", calendarSchema);
