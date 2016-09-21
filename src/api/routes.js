'use strict';

var express = require('express');
var User = require('../models/users');
var Place = require('../models/places');
var router = express.Router();
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');

router.use(session({
    secret: 'strawberry loves you',
    resave: true,
    saveuninitialized: true
}));

//Place.remove({}, function(err) {
    //console.log('collection removed')
//});

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
                    res.json({ success: true, message: 'successfully created new user' });
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

router.post('/authenticate', function(req,res){
    if(req.body.username && req.body.password){
        var callback = function(err,user){
            if(user && bcrypt.compareSync(req.body.password,user.password)){
                console.log('user authenticated');
                req.session.userId = user._id;
                req.session.user = user.username;
                res.json({ success: true, message: 'successfully authenticated', user: req.session.user });
            } else {
                res.json({ success: false, message: 'Kobinationen av användare och lösenord finns inte.' });
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

//get all places

router.get('/places', function(req,res){
    Place.find({}, function(err, places){
        if(err){
            return res.status(500).json({message: err.message});
        }
        res.send(places);
    });
});

//create new place

router.post('/places', function(req,res){
    var new_place = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        area: req.body.area,
        type_of_place: req.body.type_of_place,
        created: Date.now()
    };

    Place.create(new_place, function(err, new_place){
        if(err){
            return res.status(500).json({err: err.message});
        }
        res.json({'place': new_place});
        console.log('new place added: '+ new_place);
    })
});

//update existing place

router.put('/places/:id', function(req,res){
    var id = req.params.id;
    var place = req.body;
    if(place && place._id !== id){
        return res.status(500).json({err: "id:s don't match"})
    }
    Place.findByIdAndUpdate(id,place, {new: true}, function(err, place){
        if(err){
            return res.status(500).json({err: err.message});
        }
    })
    res.send(place);
    console.log('place updated!');
});

//delete existing place

router.delete('/places/:id', function(req,res){
    var id = req.params.id;
    var place = req.body;
    if(place && place._id !== id){
        return res.status(500).json({err: "id:s don't match"})
    }
    Place.findByIdAndRemove(id,place, {new: true}, function(err, place){
        if(err){
            return res.status(500).json({err: err.message});
        }
    })
    res.send(place);
    console.log('place deleted!');
});

module.exports = router;