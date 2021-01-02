const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/myapp",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (!err) {
      console.log("Myapp db connected");
    } else {
      console.log("Error in DB connection" + JSON.stringify(err, undefined, 2));
    }
  }
);

module.exports = mongoose;
