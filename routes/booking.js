const express = require("express");
const router = express.Router();
const auth = require("../helpers/authHelperSociety");

require("dotenv").config();

const Booking = require("../models/booking");

// @route   POST /api/booking/add
// @desc    Add a booking
// @access  Private(Only a registered society can apply for event)
router.post("/add", auth, async (req, res) => {
  try {
    // Check if date is entered or not
    if (JSON.stringify(req.body.eventDate.localeCompare("YYY-MM-DD")) === 0) {
      return res.json({
        success: false,
        message: "Please fill the date",
      });
    }

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

    try {
      const data = req.body;
      const eDate = {
        date: data.eventDate.substring(8, 10),
        month: data.eventDate.substring(5, 7),
        year: data.eventDate.substring(0, 4),
      };

      var booking = new Booking({
        name: data.name,
        description: data.description,
        societyName: req.society.name,
        societyEmail: req.society.email,
        societyId: req.society._id,
        eventDate: eDate,
        startTime: data.startTime,
        endTime: data.endTime,
        seminarHall: Number(data.seminarHall),
      });
      await booking.save();

      res.status(201).json({
        success: true,
        booking,
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        error: e,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route   POST /api/booking/check
// @desc    Check availability of Slot
// @access  Public
router.post("/check", async (req, res) => {
  try {
    // Check if date is entered or not
    if (JSON.stringify(req.body.eventDate.localeCompare("YYY-MM-DD")) === 0) {
      return res.json({
        success: false,
        message: "Please fill the date",
      });
    }

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
        message: "Please fill all the details",
      });
    }

    const { seminarHall, eventDate, startTime, endTime } = req.body;

    let x = Number(seminarHall);

    const eDate = {
      date: Number(eventDate.substring(8, 10)),
      month: Number(eventDate.substring(5, 7)),
      year: Number(eventDate.substring(0, 4)),
    };

    var check = await Booking.checkAvailability(x, eDate, startTime, endTime);
    if (check) {
      res.status(200).json({
        success: true,
        availability: true,
      });
    } else {
      res.status(200).json({
        success: true,
        availability: false,
      });
    }
  } catch (e) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get/:bookingId", async (req, res) => {
  try {
    var booking = await Booking.findOne({ _id: req.params.bookingId });
    if (!booking) {
      throw "No Such Booking Exists";
    }
    res.status(200).json({ error: false, booking });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
