const express = require("express");
const app = express();

// Middleware utilities

const bodyParser = require("body-parser");

const path = require("path");

// Mongoose
const mongoose = require("mongoose");

// Config variables
require("dotenv").config();
const { MONGOURI } = process.env;

//Connecting to the database
mongoose.promise = global.Promise;
mongoose.connect(
  MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, db) => {
    if (err) console.log(err);
    else console.log("Database Connected...");
  }
);

// Getting data in json format
app.use(bodyParser.json());

// Test route
app.get("/api", (req, res) => {
  return res.status(200).json({
    message: "API running",
  });
});

// Importing Routers

const societyRouter = require("./routes/society");
const adminRouter = require("./routes/admin");
const indexRouter = require("./routes/index");
const bookingRouter = require("./routes/booking");

// Mounting the routes

app.use("/api/society", societyRouter);
app.use("/api/admin", adminRouter);
app.use("/api", indexRouter);
app.use("/api/booking", bookingRouter);

// Serve Static Assets in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Starting the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
