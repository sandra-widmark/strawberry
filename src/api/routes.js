'use strict';

var express = require('express');
var User = require('../models/users');
var Place = require('../models/places');
var areas = require('./data/areas');
var typeofplace = require('./data/typeofplace');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');

router.use(cookieParser('strawberry'));
router.use(session({
    secret: 'strawberry',
    resave: true,
    saveuninitialized: false,
    cookie: {
        expires: false,
        httpOnly: false,
        duration: 30 * 60 * 1000
    }
}));

var sess;

// Place.remove({}, function(err) {
//     console.log('collection removed')
// });

//get json data

router.get('/typeOfPlace', function(req, res){
  var typeOfPlace = typeofplace;
  res.json({typeOfPlace: typeOfPlace});
});

router.get('/areas', function(req,res){
  var cityAreas = areas;
  res.json({areas: cityAreas});
});

// get all users

router.get('/register', function(req,res){
    User.find({}, function(err, users){
        if(err){
            return res.status(500).json({message: err.message});
        }
        res.json(users);
    });
});

//create new user

router.post('/register', function(req,res){
    var new_user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    };

    if(req.body.username && req.body.password){
        var callback = function(error,user){
            if(error) {
                res.send(400, error.message);
            }
            if (user){
                console.log('user exists');
                res.json({ success:false, message:'Användarnamnet finns redan,försök igen.' });
            } else {
                User.create(new_user, function(error,new_user){
                    if(error){
                        return res.status(500).json({ message:err.message });
                    }
                    sess = req.session;
                    sess.user = new_user.username;
                    res.json({ success: true, message: 'successfully created new user', user: sess.user });
                    console.log('new user added: ' + new_user);
                });
            }
        };
        User.findOne({
            username: req.body.username
        }, callback);
    } else {
        console.log('alla fält inte ifyllda');
        res.json({ success: false, message: 'Fyll i alla fält' });
    }

});

//Authenticate user

router.post('/authenticate', function(req,res, next){
    if(req.body.username && req.body.password){
        var callback = function(err,user){
            if(user && bcrypt.compareSync(req.body.password,user.password)){
                sess = req.session;
                req.session.username = req.body.username;
                console.log('user authenticated :', req.session.username);
                res.json({ success: true, message: 'successfully authenticated', user: req.session.username });
            } else {
                res.json({ success: false, message: 'Kombinationen av användare och lösenord finns inte.' });
                console.log('auth failure');
            }
        };
        var params = {
            username: req.body.username
        }
        User.findOne(params, callback);
    } else {
        res.json({ success: false, message: 'Fyll i alla fält' });
    }
});

//check if user is logged in
router.post('/isLoggedIn', function(req, res) {
    sess = req.session;
    sess.user = req.body.user;
    console.log('this is req.body.user: ', sess.user);
    res.json({success: true, user: sess.user});
});

router.get('/isLoggedIn', function(req,res){
    sess = req.session;
    console.log(sess.user);
    if(sess){
        res.json({ success: true, user: sess.user });
    }
    else {
        //console.log('user session does not exist');
        res.json({ success: false, user: null });
    }
});

//get all places

router.get('/places', function(req,res){
    Place.find({}, function(err, places){
        if(err){
            return res.status(500).json({ message: err.message });
        }
        sess = req.session;
        res.json(places);
    });
});

//create new place

router.post('/places', function(req,res){
    sess = req.session;
    console.log(sess.user);

    var new_place = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        area: req.body.area,
        type_of_place: req.body.type_of_place,
        created_by: sess.user,
        created: Date.now()
    };

    Place.create(new_place, function(err, place){
        if(err){
            console.log('Something went wrong');
            return res.status(500).json({err: err.message});
        }
        sess = req.session;
        console.log(sess.user);
        res.json(place);
        console.log('new place added: '+ place);
    });
});

//update existing place

router.put('/places/:id', function(req,res){

    sess = req.session;
    console.log(sess.user);

    var id = req.params.id;
    var updated_place = req.body;

    Place.findByIdAndUpdate(id, updated_place, { new: true }, function(err, updated_place){
        if(err){
            return res.status(500).json({err: err.message});
        }
    })
    res.json({ place: updated_place });
    console.log('place updated!');
});

//delete existing place

router.delete('/places/:id', function(req,res){

    sess = req.session;
    console.log(sess.user);

    var id = req.params.id;

    Place.findByIdAndRemove(id, function(err, result){
        if(err){
            return res.status(500).json({err: err.message});
        }
    })
    res.json({message: 'place deleted'});
    console.log('place deleted!');
});

module.exports = router;