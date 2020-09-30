const express = require("express");
const router = express.Router();

require("dotenv").config();

// For sending emails
require("dotenv").config();
const transporter = require("../helpers/emailHelper");

/*                                                  ROUTES                                                  */

// @route   POST /api/query
// @desc    Submit query/feedback
// @access  Public
router.post("/query", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    let HelperOptions = {
      from: process.env.EmailName + "<" + process.env.EmailId + ">",
      to: "seminarschedularmsit@gmail.com",
      subject: name + " has submitted a query",
      text: message + "\n\n" + name + " can be contacted at - " + email,
    };

    transporter.sendMail(HelperOptions, (err, info) => {
      if (err) throw err;

      console.log("The message was sent");
    });

    return res.status(200).json({
      success: true,
      message:
        "Thanks, your query has been submitted, we will contact you shortly",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
