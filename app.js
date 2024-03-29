const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");
const movieRouter = require("./routes/movieRoutes");
const directorRouter = require("./routes/directorRoutes");

dotenv.config();
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB", err);
});

// Config
const config = require("./config");
app.set("api_secret_key", config.api_secret_key);

// Middleware
const verifyToken = require("./middleware/verify-token"); // token kontrolü yapılır

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // false ise sadece string ve array olarak gelir true ise her türlü gelir
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/api", verifyToken); // token kontrolü yapılır
app.use("/api/movies", movieRouter);
app.use("/api/directors", directorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // burada
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
