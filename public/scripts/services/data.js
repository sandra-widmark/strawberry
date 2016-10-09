'use strict';

app.service('dataService', function($http){

    //get user session

    this.postUserSession = function(data){
        return $http.post('/api/isLoggedIn', data);
    };

    //create a new user

    this.createUser = function(data){
        return $http.post('/api/register', data);
    };

    //authenticate user

    this.authenticate = function(data){
        return $http.post('/api/authenticate', data);
    };

    //Logout user

    this.logout = function(){
        $http.get('/api/logout');
    };

    //get all places

    this.getPlaces = function(data){
        return $http.get('/api/places').then(data);
    };

    //Create new place

    this.createPlace = function(data){
        return $http.post('/api/places', data);
    };

    //Update existing place

    this.updatePlace = function(data){
        return $http.put('/api/places/' + data._id, data).then(function(result){
        });
    };

    //delete existing place

    this.deletePlace = function(place) {
        return $http.delete('/api/places/' + place._id).then(function(result) {
        });
    };
});