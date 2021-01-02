const Cryptr = require("cryptr");
const config = require("config");
const cryptr = new Cryptr(config.get("cryptrkey"));
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

//---------------- Admin Registration ---------------//

exports.adminRegistration = (req, res) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    Admin.findOne({ email: email }).then((admin) => {
      if (admin) {
        return res.json({ status: "failed", Message: "Email already exists" });
      } else {
        var newAdmin = new Admin({
          name: name,
          email: email,
          password: password,
          role: "admin",
        });
        const encryptedString = cryptr.encrypt(password);
        newAdmin.password = encryptedString;

        if (req.files["picture"]) {
          newAdmin.picture = req.files["picture"][0].filename;
        }
        newAdmin.save();
        let payload = { subject: newAdmin._id };
        let token = jwt.sign(payload, config.get("jwtSecKey"));
        return res.json({ status: "success", newAdmin, token });
      }
    });
  } catch (error) {
    throw error;
  }
};

//--------------- Admin Login -------------//

exports.adminLogin = (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    Users.findOne({ email: email }).then((admin) => {
      if (admin) {
        const checkPass = cryptr.decrypt(admin.password);
        if (checkPass == password) {
          let payload = { subject: admin._id };
          let token = jwt.sign(payload, config.get("jwtSecKey"));
          return res.json({ status: "success", admin, token });
        } else {
          return res.json({ status: "failed", Message: "Invalid credentials" });
        }
      } else {
        return res.json({ status: "failed", Message: "Email not exists" });
      }
    });
  } catch (error) {
    throw error;
  }
};
