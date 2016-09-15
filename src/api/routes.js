'use strict';

var express = require('express');
var User = require('../models/users');
var Place = require('../models/places');
var router = express.Router();

router.get('/test', function(req,res){
    res.json({hello: []});
});



module.exports = router;