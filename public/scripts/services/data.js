'use strict';

app.service('dataService', function($http, $mdDialog, $location, $rootScope, $window){

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
        return $http.post('/api/places', data).then(function(result){
            console.log('dataservice created new place', result.data.user);
            $window.location.reload();

        });
    };

    //Update existing place

    this.updatePlace = function(data){
        if(!data._id){
            console.log('no id!');
        }
        $http.put('/api/places/' + data._id, data).then(function(result){
             console.log('dataservice updated place', result);
        });
    };

    //delete existing place

    this.deletePlace = function(data){
        if(!data._id){
            console.log('no id!');
        }
        return $http.delete('/api/places/' + data._id).then(function(){
            console.log('Place deleted.');
        });
    };


});