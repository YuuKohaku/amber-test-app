const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

var User = require("./models/User.js");

var index = require('./routes/index');
var login = require('./routes/login');
var notes = require('./routes/notes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
require("hbs").registerPartials(path.join(__dirname, '/views/partials'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: '123654',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(User.serialize);
passport.deserializeUser(User.deserialize);
passport.use(new LocalStrategy(User.authenticate));

app.use('/', index);
app.use('/notes', notes);
app.use('/login', login);
app.all('*', function(req, res, next) {
	if(!req.user)
		res.redirect("/login");
	next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
