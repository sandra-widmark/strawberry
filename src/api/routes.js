'use strict';

var express = require('express');
var User = require('../models/users');
var Place = require('../models/places');
var router = express.Router();

//Place.remove({}, function(err) {
    //console.log('collection removed')
//});

//get all places

router.get('/places', function(req,res){
    Place.find({}, function(err, places){
        if(err){
            return res.status(500).json({message: err.message});
        }
        res.send(places);
        console.log('find places', places);
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