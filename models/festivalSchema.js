const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
    title_en: { type: String, required: false },
    title_ta: { type: String, required: false },
    description_en: { type: String, required: false },
    description_ta: { type: String, required: false },
    image: { type: String, required: false },
    isDisabled: { type: Boolean, default: false }
}, { timestamps: true });

const FestivalModel = mongoose.model('Festival', festivalSchema);

module.exports = FestivalModel;