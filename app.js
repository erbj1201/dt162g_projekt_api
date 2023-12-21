// Express
const createError = require("http-errors");
const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
app.use(morgan("dev"));
const cookieParser = require("cookie-parser"); // Add this line

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Database - MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/coffecake");
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

const path = require("path"); // Add this line

// Import models
const userModel = require("./models/userModel");
const menuModel = require("./models/menuModel");

// Import route files
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const menuRouter = require("./routes/menu");

// Routing
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/menu", menuRouter);

// Import Joi
const Joi = require("joi");

// Import fs to communicate with JSON file
const fs = require("fs").promises;
const cors = require("cors");
app.use(cors());

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Server
const PORT = process.env.PORT || 3000; // Change 3000 to a different port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;