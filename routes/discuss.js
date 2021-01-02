const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment");

//------------- Discuss Uploads -------------//
const discuss_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/discuss");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const discuss_upload = multer({
  storage: discuss_storage,
  limits: { fieldSize: 25 * 1024 * 1024 * 1024 },
});

const uploads = discuss_upload.fields([{ name: "picture", maxCount: 10 }]);

const {
  sendNewMessage,
  getUsersList,
  getDiscHistory,
  getUserIdByToken,
} = require("../controllers/discuss");

//----------------- Discuss routes ------------------//

//------------ Send New Message -------------//
router.post("/sendNewMessage", uploads, sendNewMessage);

//-------------- Get Users List -------------//
router.get("/getUsersList/:token", getUsersList);

//-------------- Get DiscHistory ------------//
router.post("/getDiscHistory", uploads, getDiscHistory);

//---------- Get User Id By Token ------------//
router.get("/getUserIdByToken/:token", getUserIdByToken);

module.exports = router;
