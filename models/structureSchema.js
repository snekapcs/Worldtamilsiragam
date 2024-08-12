const mongoose = require('mongoose');
const { TeamTypeEnum } = require('../util/constant');

const structureSchema = new mongoose.Schema({
    title_en: { type: String, required: false },
    title_ta: { type: String, required: false },
    description_en: { type: String, required: false },
    description_ta: { type: String, required: false },
    image: { type: String, required: false },
    team_type: { 
        type: String, 
        enum: Object.values(TeamTypeEnum), 
        required: true 
    },
    contactNo_en: { type: String, require: false },
    contactNo_ta: { type: String, require: false },
    isDisabled: { type: Boolean, default: false }
}, { timestamps: true });

const StructureModel = mongoose.model('Structure', structureSchema);

module.exports = StructureModel;