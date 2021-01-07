require("./config/config.js");
require("./models/db");
require("./config/passportConfig");
const mongoose = require('mongoose');

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);

const rtsIndex = require("./routes/index.router");

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api", rtsIndex);

app.use(passport.initialize());

app.use("/images", express.static(path.join("images")));
//error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});


// start server
app.listen(process.env.PORT, () =>
  console.log(`Server started at port : ${process.env.PORT}`)
);
