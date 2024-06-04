const mongoose = require('mongoose');

const multilingualSchema = new mongoose.Schema({
  name: {
    _en: { type: String, required: true },
    _ta: { type: String, required: true }
  },
  description: {
    _en: { type: String, required: true },
    _ta: { type: String, required: true }
  }
});

const MultilingualModel = mongoose.model('Multilingual', multilingualSchema);

module.exports = MultilingualModel;
