// import and include
require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const morgan = require("morgan");
app.use(morgan("dev"));
const cookieParser = require("cookie-parser");

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Allow only specific origins
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Database - MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/coffecake");
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

const path = require("path"); 

// Import models
const userModel = require("./models/userModel");
const menuModel = require("./models/menuModel");

// Import route files
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const menuRouter = require("./routes/menu");
const loginRouter = require("./routes/login");

// Routing
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/menu", menuRouter);
app.use("/login", loginRouter);

// Import Joi
const Joi = require("joi");

// Import fs to communicate with JSON file
const fs = require("fs").promises;

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

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));


// Error handling 
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Render error view error message
  res.status(500).render("error", { error: "Internal Server Error" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
