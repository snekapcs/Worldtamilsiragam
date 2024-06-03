const mongoose = require("mongoose");

const bilingualSchema = new mongoose.Schema({
  englishContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'English',
    required: true,
  },
  tamilContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tamil',
    required: true,
  },
});

const Bilingual = mongoose.model('Bilingual', bilingualSchema);
module.exports = Bilingual;
