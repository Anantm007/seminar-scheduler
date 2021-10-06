const express = require("express");
const router = express.Router();

require("dotenv").config();
const crypto = require("crypto");
const transporter = require("../helpers/emailHelper");
const auth = require("../helpers/authHelperAdmin");

// Models
const Admin = require("../models/admin");
const Booking = require("../models/booking");

/*                                                  ROUTES                                                  */

// @route   POST /api/admin/signup
// @desc    Register a new admin
// @access  Public
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, seminarHallsIncharge } = req.body;

    // Check for empty fields
    if (!name || !email || !password || !seminarHallsIncharge) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields",
      });
    }

    // If admin already exists
    const a = await Admin.findOne({ email });
    if (a) {
      return res.status(400).json({
        success: false,
        message: "Admin already registered",
      });
    }

    // Register a new admin
    admin = new Admin({
      name,
      email,
      password,
      seminarHallsIncharge,
    });

    await admin.save();

    const token = await admin.generateAuthToken();

    res.status(201).json({
      success: true,
      token,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
});

// @route   POST /api/admin/signin
// @desc    Signin an admin
// @access  Public
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find an existing admin
    const admin = await Admin.findByCredentials(email, password);

    // Generate an auth token
    const token = await admin.generateAuthToken();

    res.status(200).json({
      success: true,
      admin,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route   POST /api/admin/forgot
// @desc    Forgot Password (send token)
// @access  Only for registered but public
router.post("/forgot", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin not registered",
      });
    }

    // Generate and hash password token using crypto (to be sent to the admin)
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash it to store in the database
    admin.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expire
    admin.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    // Saving reset token and expires in the database
    await admin.save();

    // Send reset password email
    const resetUrl = `${req.protocol}://localhost:3000/admin/reset/password/${resetToken}`;

    let HelperOptions = {
      from: process.env.EmailName + "<" + process.env.EmailId + ">",
      to: admin.email,
      subject: "Seminar Scheduler Password Reset",
      text:
        "Hello " +
        admin.name +
        `, \n\nYou are receiving this email because you have requested your password reset. Please visit: \n${resetUrl} to reset your password.\n\nThe link is valid only for 10 minutes.\n\nRegards, \nSeminar Scheduler MSIT`,
    };

    transporter.sendMail(HelperOptions, (err, info) => {
      if (err) throw err;

      console.log("The message was sent");
      return res.status(200).json({
        success: true,
        message: "Email sent successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route   POST /api/admin/validToken
// @desc    Check whether token is valid or not
// @access  Only for registered (user cannot be auth if he forgot his password)
router.post("/validToken", async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route   PUT /api/admin/resetPassword/:resetToken
// @desc    Reset Password using token
// @access  Only for registered
router.put("/resetPassword/:resetToken", async (req, res) => {
  try {
    // Validate new password
    if (
      !req.body.password ||
      req.body.password === "" ||
      req.body.password.length < 6
    ) {
      return res.json({
        success: false,
        message: "Please enter a valid password with 6 or more characters",
      });
    }

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.json({
        success: false,
        message: "Invalid Token",
      });
    }

    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    // Save new password to database
    await admin.save();

    return res.json({
      success: true,
      message: "Password updated!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route   GET /api/admin/bookings/:status
// @desc    Fetch bookings of type status for the given hall of admin
// @access  Only for registered
router.get("/bookings/:status", auth, async (req, res) => {
  try {
    const admin = req.admin;
    if (!admin) {
      return res.json({
        success: false,
        message: "Invalid Token",
      });
    }
    var bookings = [];
    for (let i = 0; i < admin.seminarHallsIncharge.length; i++) {
      var books = await Booking.find({
        seminarHall: admin.seminarHallsIncharge[i],
        status: req.params.status,
      });
      bookings = bookings.concat(books);
    }
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route   POST /api/admin/address/:bookingId
// @desc    Address a booking and change its status
// @access  Only for registered
router.post("/address/:bookingId", auth, async (req, res) => {
  try {
    const admin = req.admin;
    if (!admin) {
      return res.json({
        success: false,
        message: "Invalid Token",
      });
    }
    const booking = await Booking.findOne({ _id: req.params.bookingId });
    if (!booking) {
      return res.json({
        success: false,
        message: "No such booking exists",
      });
    }
    booking.status = req.body.status;
    await booking.save();

    let HelperOptions = {};
    if (booking.status === "accepted") {
      HelperOptions = {
        from: process.env.EmailName + "<" + process.env.EmailId + ">",
        to: booking.societyEmail,
        subject: "Seminar Hall Request Accepted!",
        text:
          "Hello " +
          booking.societyName +
          `, \n\nYour request for Seminar Hall ${booking.seminarHall} for ${booking.name} has been accepted. Please approach the hall incharge to proceed further.\n\nRegards, \nSeminar Scheduler MSIT`,
      };
    } else if (booking.status === "rejected") {
      HelperOptions = {
        from: process.env.EmailName + "<" + process.env.EmailId + ">",
        to: booking.societyEmail,
        subject: "Seminar Hall Request Rejected :(",
        text:
          "Hello " +
          booking.societyName +
          `, \n\nYour request for Seminar Hall ${booking.seminarHall} for ${booking.name} has been rejected.\nMessage from incharge: ${req.body.message}\n\nRegards, \nSeminar Scheduler MSIT`,
      };
    }

    transporter.sendMail(HelperOptions, (err, info) => {
      if (err) throw err;
      console.log("The message was sent");
    });

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route   GET /api/admin/getadmin/:id
// @desc    Get an admin details
// @access  Private
router.get("/getAdmin/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (admin) {
      return res.json({
        success: true,
        data: admin,
      });
    } else {
      return res.json({
        success: false,
        message: "Admin Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route   PUT /api/admin/update/:id
// @desc    Update a admin by id
// @access  Private (using middleware)
router.put("/update/:id", async (req, res) => {
  try {
    // Checking for empty fields
    for (var keys in req.body) {
      if (req.body[keys] === undefined || req.body[keys] === "") {
        var incomplete = keys;
        break;
      }
    }

    // Return error if there are some undefined values
    if (incomplete != undefined) {
      return res.json({
        success: false,
        message: "Please fill " + incomplete.toUpperCase(),
      });
    }

    await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, admin) => {
        admin.password = undefined;
        return res.json({
          success: true,
          data: admin,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
