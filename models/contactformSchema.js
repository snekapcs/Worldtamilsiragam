const mongoose = require('mongoose');

const contactformSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'New' } 
}, { timestamps: true });

const ContactformModel = mongoose.model('Contactform', contactformSchema);

module.exports = ContactformModel;
    