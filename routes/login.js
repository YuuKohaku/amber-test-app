var express = require('express');
var router = express.Router();
const passport = require("passport");

router.get('/', function(req, res, next) {
  res.render('login', { title: "Notes | Login"});
});

router.post('/', (req, res, next) => passport.authenticate('local', function(err, user, info) {
    if (err) { 
    	return next(err); 
    }
    if (!user) { 
    	return res.render('login', info); 
    }
    req.logIn(user, function(err) {
      if (err) { 
      	return next(err); 
      }
      return res.redirect('/notes');
    });
})(req, res, next));

module.exports = router;
