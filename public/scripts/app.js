'use strict';

var app = angular.module('strawberryApp', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider){

    $routeProvider

    .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'mainController'
    })

    .when('/loggedin', {
        templateUrl: 'templates/logged-in.html',
    });
});