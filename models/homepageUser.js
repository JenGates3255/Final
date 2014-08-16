var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var UserSchema = mongoose.model ('User',{
	firstname: String,
	lastname: String,
	email: String,
	username: String, 
	password: String

})	
module.exports = UserSchema;	