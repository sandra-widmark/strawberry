app.controller('mainController', function($scope, $location){

    $scope.logout = function(path){
        $location.path(path);
    }

});