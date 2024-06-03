const mongoose = require("mongoose");

const englishSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Hello",
    trim: true,
  },
  description: {
    type: String,
    default: "Description in English",
    trim: true,
  },
});

const English = mongoose.model('English', englishSchema);
module.exports = English;
