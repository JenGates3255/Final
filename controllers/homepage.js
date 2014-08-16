var mongoose = require('mongoose');

var homepageController = {
	homepage: function(req, res){
			var error = req.flash('error');

			res.render('homepage', {
				error: error
			});
		}		
	};	

module.exports = homepageController;
