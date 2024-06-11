const mongoose = require('mongoose');

const contactformSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    liveFrom: { type: String, required: true },
    interestedIn: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

const ContactformModel = mongoose.model('Contactform', contactformSchema);

module.exports = ContactformModel;