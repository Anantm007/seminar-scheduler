const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
  date: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
});

const BookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add an Event Name"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please add an Event Description"],
      trim: true,
    },

    societyName: {
      type: String,
      trim: true,
    },

    societyEmail: {
      type: String,
      trim: true,
    },

    societyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add the Society Id"],
    },

    eventDate: {
      type: dateSchema,
      required: [true, "Please add an Event Date"],
    },

    startTime: {
      type: String,
      minlength: 4,
      maxlength: 4,
      required: [true, "Please add an Event Start Time"],
    },

    endTime: {
      type: String,
      minlength: 4,
      maxlength: 4,
      required: [true, "Please add an Event End Time"],
    },

    seminarHall: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: [true, "Please add an Event Seminar Hall Number"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

BookingSchema.statics.checkAvailability = async (
  seminarHall,
  eventDate,
  startTime,
  endTime
) => {
  var bookings = await Booking.find({
    seminarHall: seminarHall,
    "eventDate.date": eventDate.date,
    "eventDate.month": eventDate.month,
    "eventDate.year": eventDate.year,
    status: "accepted",
  });

  if (bookings.length) {
    let flag = 0;
    for (let i = 0; i < bookings.length; i++) {
      if (
        startTime < bookings[i].startTime &&
        endTime <= bookings[i].startTime
      ) {
      } else if (
        startTime >= bookings[i].endTime &&
        endTime > bookings[i].endTime
      ) {
      } else {
        flag = 1;
        break;
      }
    }
    if (flag == 1) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
