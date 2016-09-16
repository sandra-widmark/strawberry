'use strict';

app.controller('dialogController', function($scope, $mdDialog, dataService){

    $scope.showNewUserDialog = function(ev) {
        $mdDialog.show({
            controller: nextStepController,
            templateUrl: 'templates/new-user-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen //only for xs and sm breakpoints.
        }).then(function(answer){
            $scope.status = 'we got this information:' + answer;
        },function(){
            console.log('Dialog closed');
        });
    };

    $scope.showLoginDialog = function(ev) {
        $mdDialog.show({
            controller: nextStepController,
            templateUrl: 'templates/login-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen //only for xs and sm breakpoints.
        }).then(function(answer){
            $scope.status = 'we got this information:' + answer;
        },function(){
            console.log('Dialog closed');
        });
    };


    $scope.showAddDialog = function(ev) {
        $mdDialog.show({
            controller: nextStepController,
            templateUrl: 'templates/add-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen //only for xs and sm breakpoints.
        }).then(function(answer){
            $scope.status = 'we got this information:' + answer;
        },function(){
            console.log('Dialog closed');
        });
    };

    function nextStepController($scope, $mdDialog, $location, dataService) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };

        $scope.addNewUser = function(){
            console.log("Add new user");
        };

        $scope.authenticate = function(path){
            console.log("authenticate user");
            $mdDialog.hide();
            $location.path(path);
        };

        //fetch all places from the data service

        dataService.getPlaces(function(res){
            var places = res.data;
            $scope.places = places;
        });

        //Add new place

        $scope.createPlace = function(){
            var data = {
                title: $scope.place.title,
                description: $scope.place.description,
                location: $scope.place.location
            };
            dataService.createPlace(data);
            console.log('place added!', data);

            $mdDialog.hide();
        };

        //Tell data service to update existing place

        $scope.updatePlace = function(place,index){
            dataService.updatePlace(place);
        };

        //tell data sevice to delete existing place

        $scope.deletePlace = function(place, index){
            dataService.deletePlace(place).then(function(){
                places.splice(index,1);
            });
        };
    }

});
