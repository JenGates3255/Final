var async = require('async');
var Etsy = require('etsy').Etsy;
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var homepageController = require('./controllers/homepage.js');
var mongoose = require('mongoose');
var User = require('./models/homepageUser.js');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var Item = require('./models/closetitems.js');

var api = new Etsy('75r9db6oreqv417e6x74oj14', 'jtudoxvho7'); // note: shared secret is not required if you are not using the OAuth API

mongoose.connect('mongodb://heroku_app28595275:7n5pruv86bmhah2gblu7l9bkgj@ds063439.mongolab.com:63439/heroku_app28595275');



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

app.get('/', homepageController.homepage);

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
		failureRedirect:'/',
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
app.post('/deleteItem/:id',function(req,res){
	console.log(req.params.id);

	Item.remove({_id:req.params.id},function(error){
			if(error){
				res.json(500, {error:'error'});
			}
			else{
				res.redirect('/closet')
			}
		}	
	);			
});

app.get('/logout', function(req,res){
	console.log('test')
	res.redirect('/');
})		

// see the developer docs for method names
app.get('/etsyItems', function(req,res){
 request('https://openapi.etsy.com/v2/public/shops/FashionRescueMission/listings/active?api_key=75r9db6oreqv417e6x74oj14', function (error, response, body) {
		if (!error && response.statusCode == 200) {
		    var listings = JSON.parse(body).results.splice(0,req.query.n);
		    var asyncTasks=[];
		    listings.map(function(listing, i, arr){
		    	asyncTasks.push(function(asyncDone){
		    		request(('https://openapi.etsy.com/v2/public//listings/'+listing.listing_id+'/images?api_key=75r9db6oreqv417e6x74oj14'), function(error,response,body){
							if (!error && response.statusCode == 200) {
					      		var images = JSON.parse(body).results;
					      		arr[i].imagesInfo = images;
					     		asyncDone();
					      }
					      else{
					      	arr[i].imagesInfo = response;
					      	asyncDone();
					      }
		      			}
		    		)
		    	})

		    })
		    async.parallel(asyncTasks,function(){
		    	res.send(listings);

		    })
		}      
  	})
})






var server = app.listen(process.env.PORT || 4120, function() {
	console.log('Express server listening on port ' + server.address().port);
});
