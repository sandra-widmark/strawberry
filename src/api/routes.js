'use strict';

var express = require('express');
var User = require('../models/users');
var Place = require('../models/places');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var sess;

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

//Place.remove({}, function(err) {
    //console.log('collection removed')
//});

//get json data

router.get('/typeOfPlace', function(req, res){

    sess = req.session;

    var typeOfPlace = [
        { name: 'Badplats' },
        { name: 'Restaurang/café' },
        { name: 'Shopping' },
        { name: 'Friluftsliv' },
        { name: 'Utsiktsplats' },
        { name: 'Promenadstråk' },
        { name: 'Park/Trädgård' },
        { name: 'Museum' },
        { name: 'Sevärdhet' },
        { name: 'Övrigt' },
    ];

    res.json({typeOfPlace: typeOfPlace});

})

router.get('/areas', function(req,res){

  sess = req.session;

  var areas = [
          { name: "Medborgarplatsen" },
          { name: "Skanstull" },
          { name: "Gullmarsplan" },
          { name: "Skärmarbrink" },
          { name: "Blåsut" },
          { name: "Sandsborg" },
          { name: "Skogskyrkogården" },
          { name: "Tallkrogen" },
          { name: "Gubbängen" },
          { name: "Hökarängen" },
          { name: "Globen" },
          { name: "Enskede gård" },
          { name: "Sockenplan" },
          { name: "Svedmyra" },
          { name: "Stureby" },
          { name: "Hötorget" },
          { name: "Rådmansgatan" },
          { name: "Odenplan" },
          { name: "Sankt Eriksplan" },
          { name: "Fridhemsplan" },
          { name: "Thorildsplan" },
          { name: "Kristineberg" },
          { name: "Alvik" },
          { name: "Stora mossen" },
          { name: "Abrahamsberg" },
          { name: "Brommaplan" },
          { name: "Åkeshov" },
          { name: "Ängbyplan" },
          { name: "Islandstorget" },
          { name: "Blackeberg" },
          { name: "Råcksta" },
          { name: "Vällingby" },
          { name: "Bandhagen" },
          { name: "Högdalen" },
          { name: "Johannelund" },
          { name: "Hässelby gård" },
          { name: "T-Centralen" },
          { name: "Gamla stan" },
          { name: "Hammarbyhöjden" },
          { name: "Björkhagen" },
          { name: "Kärrtorp" },
          { name: "Bagarmossen" },
          { name: "Farsta" },
          { name: "Hässelby strand" },
          { name: "Rågsved" },
          { name: "Hagsätra" },
          { name: "T-Centralen" },
          { name: "Gamla stan" },
          { name: "Slussen" },
          { name: "Mariatorget" },
          { name: "Zinkensdamm" },
          { name: "Hornstull" },
          { name: "Liljeholmen" },
          { name: "Midsommarkransen" },
          { name: "Telefonplan" },
          { name: "Hägerstensåsen" },
          { name: "Västertorp" },
          { name: "Fruängen" },
          { name: "Aspudden" },
          { name: "Örnsberg" },
          { name: "Axelsberg" },
          { name: "Mälarhöjden" },
          { name: "Bredäng" },
          { name: "Sätra" },
          { name: "Östermalmstorg" },
          { name: "Karlaplan" },
          { name: "Gärdet" },
          { name: "Ropsten" },
          { name: "Skärholmen" },
          { name: "Vårberg" },
          { name: "Farsta strand" },
          { name: "Vårby gård" },
          { name: "Masmo" },
          { name: "Fittja" },
          { name: "Stadion" },
          { name: "Tekniska högskolan" },
          { name: "Universitetet" },
          { name: "Alby" },
          { name: "Hallunda" },
          { name: "Norsborg" },
          { name: "T-Centralen" },
          { name: "Rådhuset" },
          { name: "Fridhemsplan" },
          { name: "Stadshagen" },
          { name: "Västra skogen" },
          { name: "Solna centrum" },
          { name: "Näckrosen" },
          { name: "Hallonbergen" },
          { name: "Rinkeby" },
          { name: "Tensta" },
          { name: "Hjulsta" },
          { name: "Kista" },
          { name: "Husby" },
          { name: "Akalla" },
          { name: "Kungsträdgården" },
          { name: "Bergshamra" },
          { name: "Danderyds sjukhus" },
          { name: "Mörby centrum" },
          { name: "Huvudsta" },
          { name: "Solna strand" },
          { name: "Sundbybergs centrum" },
          { name: "Duvbo" },
          { name: "Rissne" },
          { name: "Skarpnäck" }
        ];

    res.json({areas: areas});
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

router.post('/authenticate', function(req,res){
    if(req.body.username && req.body.password){
        var callback = function(err,user){
            if(user && bcrypt.compareSync(req.body.password,user.password)){
                console.log('user authenticated');
                sess = req.session;
                sess.user = user.username;
                res.json({ success: true, message: 'successfully authenticated', user: sess.user });
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
        sess = req.session;
        res.send(places);
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

    Place.create(new_place, function(err, new_place){
        if(err){
            console.log('Something went wrong');
            return res.status(500).json({err: err.message});
        }
        sess = req.session;
        console.log(sess.user);
        res.json({ place: new_place });
        console.log('new place added: '+ new_place);
    })
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