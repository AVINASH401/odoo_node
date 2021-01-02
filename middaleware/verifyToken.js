const express = require("express");
const router = express.Router();
const auth = require("./auth");

router.get("/token", auth, (req, res) => {
  return res.json({ status: "success", Message: "Token verified" });
});

module.exports = router;
