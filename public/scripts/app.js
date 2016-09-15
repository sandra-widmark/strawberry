'use strict';

var app = angular.module('strawberryApp', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'home.html',
        controller: 'mainController'
    })

    .when('/loggedin', {
        templateUrl: 'logged-in.html',
    });
});