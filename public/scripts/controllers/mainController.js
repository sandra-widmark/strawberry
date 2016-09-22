app.controller('mainController', function($scope, $location, dataService, $rootScope){

    $scope.logout = function(path){
        $location.path(path);
    }

    //fetch all places from the data service

    dataService.getPlaces(function(res){
        var data = res.data;
        console.log('this is the main controller' + data);
        $scope.places = data;
        $scope.userplaces = data;
    });


    //show the user session

    $rootScope.$on('userSession', function(event,user){
        console.log('this is the event: ' + user);
        $scope.user = user;
    });


    $scope.showUserPlaces = function(path){
        $location.path(path);
    }

});