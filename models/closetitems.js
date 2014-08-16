var mongoose = require('mongoose');
var User = require('./homepageUser.js');
// var Schema = mongoose.Schema;

var ItemSchema = mongoose.model('item', {
	itemname: String,
	category: String,
	itemtype: String,
	color: String,
	itemimg: String,
	userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})	

module.exports = ItemSchema;