const config = require("config");
const Contacts = require("../models/contacts");

//------------- Add contact --------------//

exports.addContact = (req, res) => {
  try {
    let cont_type = req.body.cont_type;
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let mobile = req.body.mobile;
    let city = req.body.city;
    let city_zone = req.body.city_zone;
    let state = req.body.state;
    let tag = req.body.tag;
    let website = req.body.website;
    let gst_in = req.body.gst_in;
    let pan_no = req.body.pan_no;
    let address = req.body.address;
    let country = req.body.country;

    let contact = new Contacts({
      cont_type: cont_type,
      name: name,
      email: email,
      phone: phone,
      mobile: mobile,
      city: city,
      state: state,
      tag: tag,
      website: website,
      gst_in: gst_in,
      pan_no: pan_no,
      address: address,
      country: country,
    });
    if (req.files["picture"]) {
      contact.picture = req.files["picture"][0].filename;
    }
    contact.save();
    return res.json({ status: "success", contact });
  } catch (error) {
    throw error;
  }
};

//----------------- Get Contact by Id -----------------//

exports.getContactById = (req, res) => {
  try {
    let id = req.params.id;
    Contacts.findOne({ _id: id }).then((contact) => {
      if (contact) {
        return res.json({ status: "success", contact });
      } else {
        return res.json({ status: "failed", Message: "Contact not found" });
      }
    });
  } catch (error) {
    throw error;
  }
};

//----------------- Get All Contacts ------------------//

exports.getAllContacts = (req, res) => {
  try {
    Contacts.find().then((contacts) => {
      if (contacts) {
        return res.json({ status: "success", contacts });
      } else {
        return res.json({ status: "failed", Message: "Contacts not found" });
      }
    });
  } catch (error) {
    throw error;
  }
};

//------------- update contact --------------//

exports.updateContact = (req, res) => {
  try {
    let id = req.body.id;
    let cont_type = req.body.cont_type;
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let mobile = req.body.mobile;
    let city = req.body.city;
    let city_zone = req.body.city_zone;
    let state = req.body.state;
    let tag = req.body.tag;
    let website = req.body.website;
    let gst_in = req.body.gst_in;
    let pan_no = req.body.pan_no;
    let address = req.body.address;
    let country = req.body.country;

    Contacts.findOne({ _id: id }).then(async (contact) => {
      if (contact) {
        contact.cont_type = cont_type;
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
        contact.mobile = mobile;
        contact.city = city;
        contact.city_zone = city_zone;
        contact.state = state;
        contact.tag = tag;
        contact.website = website;
        contact.gst_in = gst_in;
        contact.pan_no = pan_no;
        contact.address = address;
        contact.country = country;

        if (req.files["picture"]) {
          contact.picture = req.files["picture"][0].filename;
        }
        await contact.save();
        return res.json({ status: "success", contact });
      } else {
        return res.json({ status: "failed", Message: "Contact not found" });
      }
    });
  } catch (error) {
    throw error;
  }
};
