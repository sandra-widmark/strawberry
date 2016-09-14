'use strict';

angular.module('strawberryApp').controller('appController', function($scope, $mdDialog){

    $scope.showNewUserDialog = function(ev) {
        $mdDialog.show({
            controller: dialogController,
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
            controller: dialogController,
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

    function dialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };

        $scope.login = function(){
            console.log("logging in");
        }
    }

});