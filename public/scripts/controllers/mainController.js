'use strict';

app.controller('mainController', function($scope, $mdDialog, dataService, $rootScope, $location, $http, $route){

    //check if user is loggedin
    $scope.$on('$routeChangeStart', function (e, next, current, path) {
        $http.get('/api/isLoggedIn').then(function(res){
            if (res.data.success){
                 $scope.user = res.data.user;
            } else {
                $location.path('/');
            }
        });
    });

    //Show logged in user

    $rootScope.$on('userSession', function(event,data){
        $scope.user = data;
    });

    //Log out function

    $scope.logout = function(){
        $location.path('/');
        dataService.logout();
        dataService.getPlaces(function(res){
            var data = res.data;
            $scope.places = data;
        });
    }

    //Hide md dialog function

    $scope.hide = function() {
        $mdDialog.hide();
    };

    //fetch all places from the data service

    dataService.getPlaces(function(res){
        var data = res.data;
        $scope.places = data;
    });

    //Update existing place

    $scope.updatePlace = function(place, index){
        dataService.updatePlace(place);
    };

    //Delete existing place

    $scope.deletePlace = function(place, index) {
        dataService.deletePlace(place).then(function() {
            dataService.getPlaces(function(res){
                var data = res.data;
                $scope.places = data;
            });
        });
    };

    //Show the users created places

    $scope.showMyPlaces = function(path){
        $location.path('/loggedin/mycreatedplaces');
    }

    //filter on type of places

    $scope.filterPlaces = function(place){
      $scope.placeType = place.type_of_place.name;
    }

    //filter on areas

    $scope.filterAreas = function(place){
      $scope.undergroundArea = place.area.name;
    }

    //Fetch data from backend

    $http.get('/api/typeOfPlace').then(function(res){
        $scope.typeOfPlace = res.data.typeOfPlace;
    });

    $http.get('/api/areas').then(function(res){
        $scope.areas = res.data.areas;
   });

});