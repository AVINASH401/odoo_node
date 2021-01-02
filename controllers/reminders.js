const CalAlarm = require("../models/cal-alarm");

//------------ Add Reminder Alarm -----------//

exports.addCalAlarm = (req, res) => {
  try {
    let calalarm = new CalAlarm({
      name: "1",
      type: "Notification",
      unit: "Hour(s)",
    });
    calalarm.save();
    return res.json({ status: "success", calalarm });
  } catch (error) {
    throw error;
  }
};

//--------------- Get Cal Alarm ---------------//

exports.getCalAlarm = (req, res) => {
  try {
    CalAlarm.find().then((calalarm) => {
      if (calalarm) {
        return res.json({ status: "success", calalarm });
      } else {
        return res.json({ status: "failed", Message: "No Calendar Alarms" });
      }
    });
  } catch (error) {
    throw error;
  }
};

//------------ Edit Reminder Alarm -----------//

exports.editCalAlarm = (req, res) => {
  try {
    let id = req.body.id;
    let name = req.body.name;
    let unit = req.body.unit;
    let type = req.body.type;

    CalAlarm.findOne({ _id: id }).then(async (calalarm) => {
      if (calalarm) {
        calalarm.name = name;
        calalarm.unit = unit;
        calalarm.type = type;
        await calalarm.save();
        return res.json({ status: "success", calalarm });
      } else {
        return res.json({
          status: "failed",
          Message: "Calendar alarm not found",
        });
      }
    });
  } catch (error) {
    throw error;
  }
};

//------------- Delete Cal Alarm -------------//

exports.deleteCalAlarm = (req, res) => {
  try {
    let id = req.params.id;
    CalAlarm.findOne({ _id: id }).then((calalarm) => {
      if (calalarm) {
        calalarm.remove();
        return res.json({ status: "success", calalarm });
      } else {
        return res.json({
          status: "failed",
          Message: "Calendar alarm not found",
        });
      }
    });
  } catch (error) {
    throw error;
  }
};
