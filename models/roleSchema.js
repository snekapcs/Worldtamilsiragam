const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role_name: { type: String, required: true },
    role_code: { type: Number, required: true, unique: true }
});

module.exports = mongoose.model('Role', roleSchema);
