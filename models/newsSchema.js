const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title_en: { type: String, required: false },
    title_ta: { type: String, required: false },
    description_en: { type: String, required: false },
    description_ta: { type: String, required: false },
    date_en: { type: String, required: false },
    date_ta: { type: String, required: false },
    author_en: { type: String, required: false },
    author_ta: { type: String, required: false },
    image: { type: String, required: false },
    isDisabled: { type: Boolean, default: false }
}, { timestamps: true });

const NewsModel = mongoose.model('News', newsSchema);

module.exports = NewsModel;