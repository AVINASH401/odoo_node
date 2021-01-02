const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment");

//--------- Admin Uploads ---------//
const reminder_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/reminders");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const reminder_upload = multer({
  storage: reminder_storage,
  limits: { fieldSize: 25 * 1024 * 1024 * 1024 },
});

const uploads = reminder_upload.fields([{ name: "picture", maxCount: 4 }]);

const {
  addCalAlarm,
  getCalAlarm,
  editCalAlarm,
  deleteCalAlarm,
} = require("../controllers/reminders");

//----------------- Reminder routes ------------------//

//------------ Add Cal-Alarm ------------//
router.get("/addCalAlarm", addCalAlarm);

//------------ Get Cal Alarm ------------//
router.get("/getCalAlarm", getCalAlarm);

//------------ Edit Cal-Alarm ------------//
router.post("/editCalAlarm", uploads, editCalAlarm);

//----------- Delete Cal Alarm ----------//
router.get("/deleteCalAlarm/:id", deleteCalAlarm);

//---------------------------------------//

module.exports = router;
