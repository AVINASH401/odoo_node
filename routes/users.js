const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment");

//--------- User Uploads ---------//
const user_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/customers");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const user_upload = multer({
  storage: user_storage,
  limits: { fieldSize: 25 * 1024 * 1024 * 1024 },
});

const uploads = user_upload.fields([{ name: "picture", maxCount: 4 }]);

const {
  userRegistration,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controllers/users");

//------------------------ User routes ----------------------//

//-------- User Registration ---------//

router.post("/userRegistration", uploads, userRegistration);

//--------- Get All Users -----------//

router.get("/getAllUsers", getAllUsers);

//--------- Get User By Id ----------//
router.get("/getUserById/:id", getUserById);

//------------ Update User -----------//
router.post("/updateUser", uploads, updateUser);

//-----------------------------------------------------------//

module.exports = router;
