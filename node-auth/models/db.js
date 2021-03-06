var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	name: String,
	email: String,
    username: String,
    password: String,
	profileimage: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
