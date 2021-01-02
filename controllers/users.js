const Cryptr = require("cryptr");
const config = require("config");
const cryptr = new Cryptr("CryptrKey");
const Users = require("../models/users");
const Contacts = require("../models/contacts");
const nodemailer = require("nodemailer");

//----------- User Registration -------------//

exports.userRegistration = (req, res) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let notifyBy = req.body.notifyBy;
    let signature = req.body.signature;
    let password = "12345";
    let aDashboard = req.body.aDashboard;
    let aDiscuss = req.body.aDiscuss;
    let aSiteAcq = req.body.aSiteAcq;
    let aCalendar = req.body.aCalendar;
    let aContacts = req.body.aContacts;
    let aCrm = req.body.aCrm;
    let aSales = req.body.aSales;
    let aSiteLoc = req.body.aSiteLoc;
    let aReminders = req.body.aReminders;
    let aPurchase = req.body.aPurchase;
    let aInvoicing = req.body.aInvoicing;
    let aSettings = req.body.aSettings;

    Users.findOne({ email: email }).then((user) => {
      if (user) {
        return res.json({ status: "failed", Message: "User already exists" });
      } else {
        var newUser = new Users({
          name: name,
          email: email,
          notifyBy: notifyBy,
          signature: signature,
        });
  
        newUser.accessRights = {
          dashboard: aDashboard,
          discuss: aDiscuss,
          siteAcq: aSiteAcq,
          calendar: aCalendar,
          contacts: aContacts,
          crm: aCrm,
          sales: aSales,
          siteLoc: aSiteLoc,
          reminders: aReminders,
          purchase: aPurchase,
          invoicing: aInvoicing,
          settings: aSettings,
        };
        const encryptedString = cryptr.encrypt(password);
        newUser.password = encryptedString;

        if (req.files["picture"]) {
          newUser.picture = req.files["picture"][0].filename;
        }
        newUser.save();

        Contacts.findOne({ email: email }).then((contact) => {
          if (!contact) {
            let newcontact = new Contacts({
              cont_type: "indvidual",
              name: name,
              email: email,
            });
            if (req.files["picture"]) {
              newcontact.picture = req.files["picture"][0].filename;
            }
            newcontact.save();
          }
        });
        return res.json({ status: "success", newUser });
      }
    });
  } catch (error) {
    throw error;
  }
};

//------------- Get All Users ---------------//

exports.getAllUsers = (req, res) => {
  try {
    Users.find().then((users) => {
      if (users) {
        return res.json({ status: "success", users });
      } else {
        return res.json({ status: "failed", Message: "Users not found" });
      }
    });
  } catch (error) {
    throw error;
  }
};

//--------------- Get User By Id -----------------//

exports.getUserById = (req, res) => {
  try {
    let id = req.params.id;

    Users.findOne({ _id: id }).then((user) => {
      if (user) {
        return res.json({ status: "success", user });
      } else {
        return res.json({ status: "failed", Message: "User not found" });
      }
    });
  } catch (error) {
    throw error;
  }
};

//--------------- Update User --------------//

exports.updateUser = (req, res) => {
  try {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let notifyBy = req.body.notifyBy;
    let signature = req.body.signature;
    let password = "12345";
    let aDashboard = req.body.aDashboard;
    let aDiscuss = req.body.aDiscuss;
    let aSiteAcq = req.body.aSiteAcq;
    let aCalendar = req.body.aCalendar;
    let aContacts = req.body.aContacts;
    let aCrm = req.body.aCrm;
    let aSales = req.body.aSales;
    let aSiteLoc = req.body.aSiteLoc;
    let aReminders = req.body.aReminders;
    let aPurchase = req.body.aPurchase;
    let aInvoicing = req.body.aInvoicing;
    let aSettings = req.body.aSettings;

    Users.findOne({ _id: id }).then(async (user) => {
      if (user) {
        user.name = name;
        user.email = email;
        user.password = password;
        user.notifyBy = notifyBy;
        user.signature = signature;

        user.accessRights = {
          dashboard: aDashboard,
          discuss: aDiscuss,
          siteAcq: aSiteAcq,
          calendar: aCalendar,
          contacts: aContacts,
          crm: aCrm,
          sales: aSales,
          siteLoc: aSiteLoc,
          reminders: aReminders,
          purchase: aPurchase,
          invoicing: aInvoicing,
          settings: aSettings,
        };

        if (req.files["picture"]) {
          user.picture = req.files["picture"][0].filename;
        }
        await user.save();

        Contacts.findOne({ email: email }).then((contact) => {
          if (contact) {
            contact.name = name;
            contact.email = email;
            if (req.files["picture"]) {
              contact.picture = req.files["picture"][0].filename;
            }
            contact.save();
          }
        });

        return res.json({ status: "success", user });
      } else {
        return res.json({ status: "failed", Message: "User not found" });
      }
    });
  } catch (error) {
    throw error;
  }
};
