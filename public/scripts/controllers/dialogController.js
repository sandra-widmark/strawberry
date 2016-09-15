'use strict';

app.controller('dialogController', function($scope, $mdDialog){

    $scope.showNewUserDialog = function(ev) {
        $mdDialog.show({
            controller: nextStepController,
            templateUrl: 'new-user-dialog.html',
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
            templateUrl: 'login-dialog.html',
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
            templateUrl: 'add-dialog.html',
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

    function nextStepController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };

        $scope.addNewUser = function(){
            console.log("Add new user");
        };

        $scope.authenticate = function(){
            console.log("authenticate user");
        };

        $scope.addActivity = function(){
            console.log("Add activity");
        }
    }

});
