const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
});

module.exports = mongoose.model('User', userSchema);
