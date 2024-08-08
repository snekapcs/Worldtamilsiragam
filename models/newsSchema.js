const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title_en: { type: String, required: true },
    title_ta: { type: String, required: true },
    description_en: { type: String, required: true },
    description_ta: { type: String, required: true },
    image: { type: String, required: true },
    isDisabled: { type: Boolean, default: false }
}, { timestamps: true });

const NewsModel = mongoose.model('News', newsSchema);

module.exports = NewsModel;