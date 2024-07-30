const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
    title_en: { type: String, required: true },
    title_ta: { type: String, required: true },
    description_en: { type: String, required: true },
    description_ta: { type: String, required: true },
    date_en: { type: String, required: true },
    date_ta: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, required: true },  
    isDisabled: { type: Boolean, default: false }
}, { timestamps: true });

const FestivalModel = mongoose.model('Festival', festivalSchema);

module.exports = FestivalModel;
