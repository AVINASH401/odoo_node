const config = require("config");
const Discuss = require("../models/discuss");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const moment = require("moment");

//-------------- Get userId by Token --------------//

exports.getUserIdByToken = (req, res) => {
  try {
    let token = req.params.token;

    let payLoad = jwt.verify(
      token,
      config.get("jwtSecKey"),
      function (err, decoded) {
        if (err) {
          return res.json({
            status: "failed",
            code: 401,
            Message: "Unauthorized request",
          });
        } else {
          let payload = jwt.verify(token, config.get("jwtSecKey"));
          let userId = payload.subject;

          Users.findOne({ _id: userId }).then((user) => {
            if (user) {
              return res.json({ status: "success", user });
            } else {
              return res.json({
                status: "failed",
                Message: "User not found",
              });
            }
          });
        }
      }
    );
  } catch (error) {
    throw error;
  }
};

//------------ Get Discuss Users List -------------//

exports.getUsersList = (req, res) => {
  try {
    let token = req.params.token;

    let payLoad = jwt.verify(
      token,
      config.get("jwtSecKey"),
      function (err, decoded) {
        if (err) {
          return res.json({
            status: "failed",
            code: 401,
            Message: "Unauthorized request",
          });
        } else {
          let payload = jwt.verify(token, config.get("jwtSecKey"));
          let userId = payload.subject;

          Users.find({ _id: { $ne: userId } }).then((users) => {
            if (users) {
              return res.json({ status: "success", users });
            } else {
              return res.json({
                status: "failed",
                Message: "Sender not found",
              });
            }
          });
        }
      }
    );
  } catch (error) {
    throw error;
  }
};

//-------------- Send New Message ---------------//

exports.sendNewMessage = async (req, res) => {
  try {
    let message = req.body.message;
    let receiverId = req.body.receiverId;
    let receiverName = req.body.receiverName;
    let token = req.body.token;

    let payLoad = jwt.verify(
      token,
      config.get("jwtSecKey"),
      function (err, decoded) {
        if (err) {
          return res.json({
            status: "failed",
            code: 401,
            Message: "Unauthorized request",
          });
        } else {
          let payload = jwt.verify(token, config.get("jwtSecKey"));
          let senderUserId = payload.subject;
          let disRoomId = senderUserId + receiverId;

          Users.findOne({ _id: senderUserId }).then(async (user) => {
            if (user) {
              let discuss = new Discuss({
                roomId: disRoomId,
                message: message,
                senderId: senderUserId,
                sender: user.name,

                receiverId: receiverId,
                receiver: receiverName,
                disTime: moment().format("LLLL"),
              });

              if (req.files["picture"]) {
                for (let i = 0; i < req.files["picture"].length; i++) {
                  discuss.pictures.push(req.files["picture"][i].filename);
                }
              }

              await discuss.save();

              return res.json({ status: "success", discuss });
            } else {
              return res.json({
                status: "failed",
                Message: "Sender not found",
              });
            }
          });
        }
      }
    );
  } catch (error) {
    throw error;
  }
};

//------------- Get Discussion History -------------//

exports.getDiscHistory = (req, res) => {
  try {
    let token = req.body.token;
    let receiverId = req.body.receiverId;

    let payLoad = jwt.verify(
      token,
      config.get("jwtSecKey"),
      function (err, decoded) {
        if (err) {
          return res.json({
            status: "failed",
            code: 401,
            Message: "Unauthorized request",
          });
        } else {
          let payload = jwt.verify(token, config.get("jwtSecKey"));
          let senderId = payload.subject;
          let receive1 = senderId + receiverId;
          let receive2 = receiverId + senderId;

          Discuss.find({
            roomId: { $in: [receive1, receive2] },
          }).then((discuss) => {
            if (discuss) {
              return res.json({ status: "success", discuss });
            } else {
              return res.json({
                status: "failed",
                Message: "Records not found",
              });
            }
          });
        }
      }
    );
  } catch (error) {
    throw error;
  }
};
