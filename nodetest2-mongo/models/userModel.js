var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    fullname: String,
    age: String,
    location: String,
    gender: String
});

var userModel = mongoose.model('userlist', userSchema);

module.exports = userModel;