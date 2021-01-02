const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment");

//--------- Admin Uploads ---------//
const admin_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/admin");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const admin_upload = multer({
  storage: admin_storage,
  limits: { fieldSize: 25 * 1024 * 1024 * 1024 },
});

const uploads = admin_upload.fields([{ name: "picture", maxCount: 4 }]);

const {
  adminRegistration,
  adminLogin,
} = require("../controllers/admin");


//----------------- Admin routes ------------------//

//--------- Admin Registration -----------//
router.post("/adminRegistration", uploads, adminRegistration);

//----------- Admin Login -----------//
router.post("/adminLogin", uploads, adminLogin);

//-----------------------------------//

module.exports = router;
