const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  title_en: { type: String, required: false },
  title_ta: { type: String, required: false },
  description_en: { type: String, required: false },
  description_ta: { type: String, required: false },
  date_en: { type: String, required: false },
  date_ta: { type: String, required: false },
  location_en: { type: String, required: false },
  location_ta: { type: String, required: false },
  sub_description_en: { type: String, required: false },
  sub_description_ta: { type: String, required: false },
  file: { type: String, required: true },
  isDisabled: { type: Boolean, default: false }
}, { timestamps: true });

const InvitationModel = mongoose.model('Invitation', invitationSchema);

module.exports = InvitationModel;