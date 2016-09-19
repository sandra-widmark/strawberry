'use strict';

var mongoose = require('mongoose');

var placeSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    area: String,
    type_of_place: String,
    created_by: String
});

var model = mongoose.model('Place', placeSchema);

module.exports = model;