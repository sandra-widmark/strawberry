app.controller('filterController', function($http, $scope){

    $http.get('/api/areas').then(function(res){
      $scope.areas = res.data.areas;
    });

    $http.get('/api/typeOfPlace').then(function(res){
      $scope.typeOfPlace = res.data.typeOfPlace;
    });

});