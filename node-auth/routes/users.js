var express = require('express');
var passport = require('passport');
var multer = require('multer');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/db');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.post('/register', function(req, res, next) {
  // get form values
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  var profileImageName = 'noimage.png';

  // form validation
  req.checkBody('name','Name is required.').notEmpty();
  req.checkBody('email','Email is required.').notEmpty();
  req.checkBody('email','Email not valid.').isEmail();
  req.checkBody('username', 'Username is required.').notEmpty();
  req.checkBody('password','Password is required.').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  // chk for errors
  var errors = req.validationErrors();
  if(errors){
    res.render('register',{
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
    console.log(errors);
  } else {
    User.register(new User({username : username, name : name, email : email, profileimage : profileImageName}),
      password,
      function (err, account){
        if(err){
          req.flash('error', 'Username already exists. Try again');
          return res.render('register',{
            name: name,
            email: email,
            password: password,
            password2: password2
          });
        }
        passport.authenticate('local')(req, res, function(){
          req.flash('success', 'You are registered');
        });
      });
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}), function(req, res){
  res.redirect('/');
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('info', 'You have logged out');
  res.redirect('/users/login');
});

module.exports = router;
