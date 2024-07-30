const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
    title_en: { type: String, required: true },
    title_ta: { type: String, required: true },
    description_en: { type: String, required: true },
    description_ta: { type: String, required: true },
    date_en: { type: String, required: true },
    date_ta: { type: String, required: true },
    image: { type: Object , required: true },
    gallery_images: { type: [Object], required: true },
    video: { type: [Object], required: true },  
    isDisabled: { type: Boolean, default: false },
    heading_en: { type: String, required: true },
    heading_ta: { type: String, required: true },
    subHeading_en: { type: String, required: true },
    subHeading_ta: { type: String, required: true },
    specialChairman_en: { type: String, required: true },
    specialChairman_ta: { type: String, required: true },
    specialChairmanName_en: { type: String, required: true },
    specialChairmanName_ta: { type: String, required: true },
    minister_en: { type: String, required: true },
    minister_ta: { type: String, required: true },
    chairman_en: { type: String, required: true },
    chairman_ta: { type: String, required: true },
    chairmanName_en: { type: String, required: true },
    chairmanName_ta: { type: String, required: true },
    generalSecretary_en: { type: String, required: true },
    generalSecretary_ta: { type: String, required: true },
    generalSecretaryName_en: { type: String, required: true },
    generalSecretaryName_ta: { type: String, required: true }

}, { timestamps: true });

const FestivalModel = mongoose.model('Festival', festivalSchema);

module.exports = FestivalModel;
