var express = require('express');
var multer = require('multer');
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
  var password2 = req.body.password1;

  var profileImageName = 'noimage.png';

  // form validation
  req.checkBody('name','Name is required.').notEmpty();
  req.checkBody('email','Email is required.').notEmpty();
  req.checkBody('email','Email not valid.').isEmail();
  req.checkBody('username', 'Username is required.').notEmpty();
  req.checkBody('password','Password is required.').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.pasword);

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
  } else {
    var newUser = new User({
    name: name,
    email: email,
    username: username,
    password: password,
    profileimage: profileImageName
    });

    // create User
    /* User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });*/
    newUser.save(function(err, newuser){
        if(err) return console.log(err);
       //res.send((err === null) ? { msg: '' } : { msg: err });
    });

    //success message
    req.flash('success', 'You are now registered. You may login');

    res.location('/');
    res.redirect('/'); 
  }
});

module.exports = router;
