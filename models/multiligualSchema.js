const mongoose = require('mongoose');

const multilingualSchema = new mongoose.Schema({
    name_en: { type: String, required: false },
    name_ta: { type: String, required: false },
    description_en: { type: String, required: false },
    description_ta: { type: String, required: false }
});

const MultilingualModel = mongoose.model('Multilingual', multilingualSchema);

module.exports = MultilingualModel;
