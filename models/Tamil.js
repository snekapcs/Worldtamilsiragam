const mongoose = require("mongoose");

const tamilSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "வணக்கம்",
    trim: true,
  },
  description: {
    type: String,
    default: "விளக்கம் தமிழில்",
    trim: true,
  },
});

const Tamil = mongoose.model('Tamil', tamilSchema);
module.exports = Tamil;
