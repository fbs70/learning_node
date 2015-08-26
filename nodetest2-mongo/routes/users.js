var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var UserModel = require('../models/userModel');

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
  UserModel.find({}, function(err, docs){
    if(err) return console.log(err);
    else res.json(docs);
  });
});

/* POST new user */
router.post('/adduser', function(req, res, next){
    var newuser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        fullname: req.body.fullname,
        age: req.body.age,
        location: req.body.location,
        gender: req.body.gender
    });
    console.log(newuser);
    
    newuser.save(function(err, newuser){
        if(err) return console.log(err);
        res.send((err === null) ? { msg: '' } : { msg: err });
    });
});

/* DELETED user */
router.delete('/deleteuser/:id', function(req, res, next){
    var id = req.params.id.toString();
    if(!req.xhr) return next();
    console.log(id);
    
    UserModel.findById(id, function(err, doc){
        if(err) return console.log(err);
        doc.remove(function(err, doc){
            res.send((err === null) ? { msg: '' } : { msg: err });
        });
    });
});



module.exports = router;
