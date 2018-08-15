const mongoose = require("mongoose");
const express = require("express");
const app = express();
const passport = require("passport");
const parser = require("body-parser");
var cors = require("cors");
const morgan = require("morgan");
const logger = require("./logger/logger");

const db = require("./config/config").dbURL;
const access = require("./api/v1/accesshandler");
const messages = require("./api/v1/messagehandler");
const profiles = require("./api/v1/profilehandler");

//DB Connection
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("Database Connection Successful"))
  .catch(err => console.log(err));

//Logger
app.use(
  morgan("combined", {
    stream: logger.stream
  })
);

//cors
app.use(cors());

//Middelware
app.use(
  parser.urlencoded({
    extended: false
  })
);
app.use(parser.json());
app.use(passport.initialize());

//JWT Strategy
require("./config/passport.js")(passport);

//Routes
app.use("/api/access", access);
app.use("/api/message", messages);
app.use("/api/profile", profiles);

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//Port
const port = process.env.PORT || 5000;

//Server Start
app.listen(port, () => console.log("Started at " + port));
