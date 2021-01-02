const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment");

//------------- Contacts Uploads -------------//
const contact_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/contacts");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const contact_upload = multer({
  storage: contact_storage,
  limits: { fieldSize: 25 * 1024 * 1024 * 1024 },
});

const uploads = contact_upload.fields([{ name: "picture", maxCount: 4 }]);

const {
  addContact,
  getContactById,
  getAllContacts,
  updateContact,
} = require("../controllers/contacts");

//----------------- Contacts routes ------------------//

//----------- Add Contact -------------//
router.post("/addContact", uploads, addContact);

//--------- Get Contact By Id ---------//
router.get("/getContactById/:id", getContactById);

//--------- Get All Contacts ----------//
router.get("/getAllContacts", getAllContacts);

//---------- Update Contact -----------//
router.post("/updateContact", uploads, updateContact);

module.exports = router;
