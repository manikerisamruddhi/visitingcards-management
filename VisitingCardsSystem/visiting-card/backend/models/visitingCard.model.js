const mongoose = require("mongoose");
const visitingCardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardName: {
      type: String,
      required: true,
    },
    cardImage: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    contact: {
      type: [String], // Changed from String to an array of strings
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisitingCard", visitingCardSchema);
