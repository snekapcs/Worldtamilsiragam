const mongoose = require('mongoose');

const multilingualSchema = new mongoose.Schema({
    name_en: { type: String, required: true },
    name_ta: { type: String, required: true },
    description_en: { type: String, required: true },
    description_ta: { type: String, required: true }
}, { timestamps: true });

const MultilingualModel = mongoose.model('Multilingual', multilingualSchema);

module.exports = MultilingualModel;
