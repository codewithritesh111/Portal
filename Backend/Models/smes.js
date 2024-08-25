const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    img: String,
    email: String,
    username: String,
    account: String,
    phoneType: String,
    phoneNumber: String,
    location: String,
    profession: String,
    w3profile: String
});

module.exports = mongoose.model('Smes', userSchema);