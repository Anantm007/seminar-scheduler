require("dotenv").config();
const nodemailer = require("nodemailer");

// Initialise mail sending
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EmailId,
    pass: process.env.EmailPass,
  },
});

module.exports = transporter;
