const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    partner: String,
    password: String,
    coupleDate: Date,
    token: String,
    projets: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;
