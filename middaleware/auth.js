const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const config = require("config");

module.exports = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.json({
      status: "failed",
      code: 401,
      Message: "Unauthorized request",
    });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.json({
        status: "failed",
        code: 401,
        Message: "Unauthorized request",
      });
    } else {
      let payLoad = jwt.verify(token, config.get("jwtSecKey"), function (
        err,
        decoded
      ) {
        if (err) {
          return res.json({
            status: "failed",
            code: 401,
            Message: "Unauthorized request",
          });
        } else {
          let payload = jwt.verify(token, config.get("jwtSecKey"));
          req.userId = payload.subject;
          next();
        }
      });
    }
  }
};
