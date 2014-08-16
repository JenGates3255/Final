var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var homepageController = require('./controllers/homepage.js')
var mongoose = require('mongoose');
var User = require('./models/homepageUser.js')
var passport = require('passport')
var flash = require('connect-flash')
var session = require('express-session')
var LocalStrategy = require('passport-local').Strategy;
var Item = require('./models/closetitems.js')

mongoose.connect('mongodb://localhost/final');



var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({ secret: 'kittens' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get('/closet', indexController.index);

app.get('/welcome', homepageController.homepage);

app.post('/usersignup', function(req,res){
	var user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		username: req.body.username, 
		password: req.body.password
	});
	user.save(function(err, app){
		if(err){
			res.send(500, 'Error')
		}
		else{
			res.send('thanks ' + user.firstname);
		}
	});
});
app.post('/signin', 
	passport.authenticate('local', {
		successRedirect:'/closet',
		failureRedirect:'/welcome',
		failureFlash: true })
	);
	passport.use(new LocalStrategy({
		username: 'username',
		password: 'password'
 	},
  	function(username, password, done) {
    	User.findOne({ username: username }, function(err, user) {
      	if (err) { return done(err); }
        	if (!user) {
         	return done(null, false, { message: 'Unknown user ' + username });
          	}
        	if (user.password != password) { 
        		return done(null, false, { message: 'Invalid password' });
        	 	}
        	return done(null, user);
    });
  }
));
	passport.serializeUser(function(user, done) {
	    done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
	    done(null, id);
	});

app.post('/additem', function(req, res){
	var item = new Item({
		itemname: req.body.itemname,
		category: req.body.category,
		itemtype: req.body.itemtype,
		color: req.body.color,
		itemimg: req.body.itemimg,
		userid: req.user
	})
	item.save(function(err,app){
		if(err){
			res.send(500,'error')
		}
		else{
				// console.log(req.body.selectpicker)
			res.redirect('/closet')
		}	
	});	
});
// app.post('/deleteitem/:id/delete',function(req,res){
// 	Item.remove({_id: req.params.id},
// 		function(err){
// 			if(err){
// 				res.json(err);
// 			}
// 			else{
// 				res.redirect('/closet')
// 			}
// 	});			
// })
		





var server = app.listen(4120, function() {
	console.log('Express server listening on port ' + server.address().port);
});
