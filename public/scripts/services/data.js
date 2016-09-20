'use strict';

app.service('dataService', function($http){

    //create a new user

    this.createUser = function(data){
        return $http.post('/api/register', data).then(function(){
            console.log('dataservice created new user');
        });
    };

    //get all places

    this.getPlaces = function(callback){
        $http.get('/api/places').then(callback);
    };

    //Create new place

    this.createPlace = function(data){
        return $http.post('/api/places', data).then(function(){
            console.log('dataservice created new place', data);
        });
    };

    //Update existing place

    this.updatePlace = function(place){
        if(!place._id){
            $http.put('/api/places', place);
        }
        $http.put('/api/places' + place._id, place).then(function(result){
            return result.data.place;
        });
    };

    //delete existing place

    this.deletePlace = function(place){
        if(!place._id){
            console.log('error, no id');
        }
        return $http.delete('/api/places' + place._id).then(function(){
            console.log(place.title + ' deleted.');
        });
    };


});