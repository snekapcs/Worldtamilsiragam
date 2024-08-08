const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  title_en: { type: String, required: true },
  title_ta: { type: String, required: true },
  description_en: { type: String, required: true },
  description_ta: { type: String, required: true },
  date_en: { type: String, required: true },
  date_ta: { type: String, required: true },
  location_en: { type: String, required: true },
  location_ta: { type: String, required: true },
  sub_description_en: { type: String, required: true },
  sub_description_ta: { type: String, required: true },
  file: { type: String, required: true },
  isDisabled: { type: Boolean, default: false }
}, { timestamps: true });

const InvitationModel = mongoose.model('Invitation', invitationSchema);

module.exports = InvitationModel;