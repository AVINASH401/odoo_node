const config = require("config");
const jwt = require("jsonwebtoken");
const Calendar = require("../models/calendar");

//------------------ Add event -----------------//

exports.addEvent = async (req, res) => {
  let start = req.body.start;
  let end = req.body.end;
  let eventName = req.body.eventName;
  let eventAttendee = req.body.eventAttendee;
  let eventDesc = req.body.eventDesc;

  try {
    let payload = jwt.verify(eventAttendee, config.get("jwtSecKey"));
    const arr = [
      {
        primary: "#ad2121",
        secondary: "#FAE3E3",
      },
      {
        primary: "#1e90ff",
        secondary: "#D1E8FF",
      },
      {
        primary: "#e3bc08",
        secondary: "#FDF1BA",
      },
    ];
    const ck = Math.floor(Math.random() * Math.floor(3));

    let calendar = new Calendar({
      name: eventName,
      description: eventDesc,
      start: start,
      end: end,
      duration: "30 min",
      created_by: payload.subject,
      attendees: [],
      color: { primary: "", secondary: "" },
    });

    calendar.color.primary = arr[ck].primary;
    calendar.color.secondary = arr[ck].secondary;
    calendar.attendees.push(payload.subject);
    await calendar.save();
    return res.json({ status: "success", calendar });
  } catch (error) {
    return res.json({ status: "failed", Message: "Invalid user token" });
  }
};

//----------------- Get all events ---------------//

exports.getAllEvents = (req, res) => {
  try {
    Calendar.find().then((calendar) => {
      if (calendar) {
        return res.json({ status: "success", calendar });
      } else {
        return res.json({ status: "failed", Message: "Events not found" });
      }
    });
  } catch (error) {
    throw error;
  }
};

//----------------- Get event by id ---------------//

exports.getEventById = (req, res) => {
  try {
    let id = req.params.id;
    Calendar.findOne({ _id: id }).then((calendar) => {
      if (calendar) {
        return res.json({ status: "success", calendar });
      } else {
        return res.json({ status: "failed", Message: "Event not found" });
      }
    });
  } catch (error) {
    throw error;
  }
};

//-------------------- Edit event -------------------//

exports.editEvent = (req, res) => {
  try {
    let eventId = req.body.eventId;
    let eventName = req.body.eventName;
    let contacts = JSON.parse(req.body.contacts);
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let eventAllDay = req.body.eventAllDay;
    let eventDuration = req.body.eventDuration;
    let eventLoc = req.body.eventLoc;
    let eventDesc = req.body.eventDesc;

    Calendar.findOne({ _id: eventId }).then(async (newEvent) => {
      if (newEvent) {
        newEvent.name = eventName;
        newEvent.start = startDate;
        newEvent.end = endDate;
        newEvent.duration = eventDuration;
        newEvent.allDay = eventAllDay;
        newEvent.location = eventLoc;
        newEvent.description = eventDesc;
        newEvent.attendees = contacts;
        await newEvent.save();
        return res.json({ status: "success", newEvent });
      } else {
        return res.json({ status: "failed", Message: "Event not found" });
      }
    });
  } catch (error) {
    throw error;
  }
};

//------------- Delete Event --------------//

exports.deleteEvent = (req, res) => {
  try {
    let eventId = req.body.eventId;
    Calendar.findOne({ _id: eventId }).then(async (newEvent) => {
      if (newEvent) {
        await newEvent.remove();
        return res.json({ status: "success", Message: "Event deletd" });
      } else {
        return res.json({ status: "failed", Message: "Event not found" });
      }
    });
  } catch (error) {
    throw error;
  }
};
