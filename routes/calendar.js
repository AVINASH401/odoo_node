const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment");

//--------- Calendar Uploads ---------//
const calendar_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/calendar");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const calendar_upload = multer({
  storage: calendar_storage,
  limits: { fieldSize: 25 * 1024 * 1024 * 1024 },
});

const uploads = calendar_upload.fields([{ name: "picture", maxCount: 4 }]);

const {
  addEvent,
  getAllEvents,
  getEventById,
  editEvent,
  deleteEvent,
} = require("../controllers/calendar");

//----------------- Calendar routes ------------------//

//--------- Add event -----------//
router.post("/addEvent", uploads, addEvent);

//-------- Get All Events -------//
router.get("/getAllEvents", getAllEvents);

//-------- Get Event By Id -------//
router.get("/getEventById/:id", getEventById);

//---------- Edit Event ----------//
router.post("/editEvent", uploads, editEvent);

//-------- Delete Event ----------//
router.post("/deleteEvent", uploads, deleteEvent);

module.exports = router;
