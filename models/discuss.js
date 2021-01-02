const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

const discussSchema = new mongoose.Schema({
  roomId: {
    type: String,
  },
  message: {
    type: String,
  },

  sender: {
    type: String,
  },
  receiver: {
    type: String,
  },
  disTime: {
    type: String,
  },
  pictures: [
    {
      type: String,
      default: "",
    },
  ],
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  date: {
    type: String,
    default: () => moment().format("l"),
  },
});

module.exports = mongoose.model("Discuss", discussSchema);
