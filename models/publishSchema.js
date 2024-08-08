const mongoose = require('mongoose');

const publishSchema = new mongoose.Schema({
    title_en: { type: String, required: true },
    title_ta: { type: String, required: true },
    file: { type: String, required: true },
    isDisabled: { type: Boolean, default: false }
}, { timestamps: true });

const PublishModel = mongoose.model('Publish', publishSchema);

module.exports = PublishModel;