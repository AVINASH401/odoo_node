const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const http = require("http");
const cors = require("cors");
const config = require("config");

const app = express();

const mongoose = require("./db");
mongoose.set("useNewUrlParser", true);

app.use(express.static("uploads/admin"));
app.use(express.static("uploads/users"));
app.use(express.static("uploads/customers"));
app.use(express.static("uploads/contacts"));
app.use(express.static("uploads/calendar"));
app.use(express.static("uploads/reminders"));
app.use(express.static("uploads/discuss"));

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(
  session({
    key: "user_sid",
    secret: "eg[isfd-8yF9-7w2315df{}+Ijsli;;to8",
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    secure: true,
    ephemeral: true,
    cookie: {
      expires: 600000,
    },
  })
);

const PORT = config.get("PORT");

const httpServer = http.createServer(app);
server = httpServer.listen(
  PORT,
  console.log(`HTTP server started on port: ${PORT}`)
);

//---------------- Api Routes --------------//
app.use("/verify", require("./middaleware/verifyToken"));
app.use("/user", require("./routes/users"));
app.use("/admin", require("./routes/admin"));
app.use("/contacts", require("./routes/contacts"));
app.use("/calendar", require("./routes/calendar"));
app.use("/reminder", require("./routes/reminders"));
app.use("/discuss", require("./routes/discuss"));
