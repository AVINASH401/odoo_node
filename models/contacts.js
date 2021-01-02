const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

const contactsSchema = new mongoose.Schema({
  cont_type: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  picture: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  city_zone: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  gst_in: {
    type: String,
    default: "",
  },
  pan_no: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: () => moment().format("l"),
  },
});

module.exports = mongoose.model("Contacts", contactsSchema);
