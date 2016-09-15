'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/smultron-sthlm', function(err){
    if(err){
        console.log('Failed connectiong to MongoDB!');
    } else {
        console.log('Connected to mongoDB!');
    }
});