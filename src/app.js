'use strict';

var express = require('express');
var app = express();
var parser = require('body-parser');
var routes = require('./api/routes');

require('./database');

app.use(express.static('public'));

app.use(parser.json());
app.use('/api', routes);

app.listen(8080, function(){
    console.log('server is running!');
});