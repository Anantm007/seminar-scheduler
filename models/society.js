const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SocietySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please add an email"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },

    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],

    pending: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

SocietySchema.methods.generateAuthToken = async function () {
  const society = this;
  const token = jwt.sign(
    { society: { id: society.id } },
    process.env.JWTSECRET
  );
  // console.log(token)
  society.tokens = society.tokens.concat({ token });
  await society.save();
  return token;
};

SocietySchema.statics.findByCredentials = async (email, password) => {
  const society = await Society.findOne({ email: email });
  if (!society) {
    throw new Error("Unable to Log In");
  }
  const isMatch = await bcrypt.compare(password, society.password);
  if (!isMatch) {
    throw new Error("Unable to Log In");
  }
  return society;
};

SocietySchema.pre("save", async function (next) {
  const society = this;
  if (society.isModified("password")) {
    society.password = await bcrypt.hash(society.password, 8);
  }
  next();
});

const Society = mongoose.model("Society", SocietySchema);

module.exports = Society;
