var Item = require('../models/closetitems')

var indexController = {
	index: function(req, res) {
		if (!req.user) {
			res.redirect('/welcome')
		}

		Item.find({userid: req.user}, function (err, items) {
		  	if (err){
		   		return handleError(err);
		  	}

		  	res.render('mainpage', {
				items: items
			});
		});
	}
};

module.exports = indexController;