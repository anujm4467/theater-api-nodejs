const express = require("express");
const app = express();

//body-parser--------
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/theater",
  { useNewUrlParser: true },
  () => {
    console.log("connected with mongodb....");
  }
);

//routes----------
const theaterRoute = require("./api/routes/theatre");
const userRoute = require("./api/routes/user");

//morgan config -------
const morgan = require("morgan");
app.use(morgan("dev"));

//middlewares ---------
app.use("/theatre", theaterRoute);
app.use("/user", userRoute);

///handling error ========
app.use((req, res, next) => {
  const error = new Error("404 Page not found !!!!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
