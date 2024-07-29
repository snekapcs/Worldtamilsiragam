const mongoose = require('mongoose');

const visionSchema = new mongoose.Schema({
    title_en: { type: String, required: false },
    title_ta: { type: String, required: false },
    description_en: { type: String, required: false },
    description_ta: { type: String, required: false },
    imageTitle_en: { type: String, required: false },
    imageTitle_ta: { type: String, required: false },
    image: { type: String, required: true },
    isDisabled: { type: Boolean, default: false }
}, { timestamps: true });

const VisionModel = mongoose.model('Vision', visionSchema);

module.exports = VisionModel;

