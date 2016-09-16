app.controller('mainController', function($scope, $location, dataService){

    $scope.logout = function(path){
        $location.path(path);
    }

});