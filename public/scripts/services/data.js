'use strict';

app.service('dataService', function($http, $mdDialog, $location, $rootScope, $window){

    //get user session

    this.postUserSession = function(data){
        return $http.post('/api/isLoggedIn', data);
    };

    //create a new user

    this.createUser = function(user){
        return $http.post('/api/register', user).then(function(result){
            console.log('dataservice created new user');
            if (result.data.success){
                console.log(result.data.message);
                $mdDialog.hide();
                $location.path('/loggedin');
                $rootScope.$emit('userSession', result.data.user);
            } else {
                $rootScope.$emit('userError', result.data.message);
            };
        });
    };

    //authenticate user

    this.authenticate = function(data){
        return $http.post('api/authenticate', data);
            console.log('dataservice authenticated user ', result.data.user);

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
             console.log('dataservice updated place', result);
        });
    };

    //delete existing place

    this.deletePlace = function(data){
        return $http.delete('/api/places/' + data._id).then(function(){
            console.log('Place deleted.');
        });
    };
});