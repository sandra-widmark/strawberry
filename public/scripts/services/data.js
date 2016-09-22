'use strict';

app.service('dataService', function($http, $mdDialog, $location, $rootScope){

    //create a new user

    this.createUser = function(user){
        return $http.post('/api/register', user).then(function(result){
            console.log('dataservice created new user');
            if (result.data.success){
                console.log(result.data.message);
                $mdDialog.hide();
                $location.path('/loggedin');
            } else {
                //console.log(result.data.message);
                $rootScope.$emit('userError', result.data.message);

            };
        });
    };

    //authenticate user

    this.authenticate = function(data){
        return $http.post('api/authenticate', data).then(function(result){
            console.log('dataservice authenticated user');
            if(result.data.success){
                $mdDialog.hide();
                $location.path('/loggedin');
                $rootScope.$emit('userSession', result.data.user);

            } else {
                //console.log(result.data.message);
                $rootScope.$emit('authError', result.data.message);
            };
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