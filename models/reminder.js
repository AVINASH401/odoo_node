const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

const remindersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contacts",
    },
  ],
  starting_at: {
    type: String,
  },
  ending_at: {
    type: String,
  },
  duration: {
    type: String,
  },
  reminder: {
    type: String,
  },
  origion: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  privacy: {
    type: String,
  },
  showAs: {
    type: String,
  },

  date: {
    type: String,
    default: () => moment().format("l"),
  },
});

module.exports = mongoose.model("Reminders", remindersSchema);
