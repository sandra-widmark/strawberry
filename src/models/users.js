'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    liked_places: [String],
    created_places: [String]
});

var model = mongoose.model('User', userSchema);

module.exports = model;