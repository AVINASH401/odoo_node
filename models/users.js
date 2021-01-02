const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

const usersSchema = new mongoose.Schema({
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
  lastLogin: {
    type: String,
  },
  mobile: {
    type: String,
  },
  language: {
    type: String,
    default: "englist",
  },
  timeZone: {
    type: String,
  },
  notifyBy: {
    type: String,
  },
  signature: {
    type: String,
  },
  accessRights: {
    dashboard: {
      type: String,
      default: "all",
    },
    discuss: {
      type: String,
      default: "all",
    },
    siteAcq: {
      type: String,
      default: "all",
    },
    calendar: {
      type: String,
      default: "all",
    },
    contacts: {
      type: String,
      default: "all",
    },
    crm: {
      type: String,
      default: "all",
    },
    sales: {
      type: String,
      default: "all",
    },
    siteLoc: {
      type: String,
      default: "all",
    },
    reminders: {
      type: String,
      default: "all",
    },
    purchase: {
      type: String,
      default: "all",
    },
    invoicing: {
      type: String,
      default: "all",
    },
    settings: {
      type: String,
      default: "all",
    },
  },
  role: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  date: {
    type: String,
    default: () => moment().format("l"),
  },
});

module.exports = mongoose.model("Users", usersSchema);
