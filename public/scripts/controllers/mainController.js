'usere strict';

app.controller('mainController', function($scope, $mdDialog, dataService, $rootScope, $location, $http, $route){

    $http.get('/api/isLoggedIn').then(function(res){
        if (res.data.success){
             $scope.userSession = res.data.user;
        } else {
            $location.path('/');
        }
    });

    $rootScope.$on('userSession', function(event,data){
        $scope.userSession = data;
    });


    $http.get('/api/areas').then(function(res){
      $scope.areas = res.data.areas;
    });

    $http.get('/api/typeOfPlace').then(function(res){
      $scope.typeOfPlace = res.data.typeOfPlace;
    });

    $scope.logout = function(){
        $location.path('/');
    }

    //fetch all places from the data service

    dataService.getPlaces(function(res){
        var data = res.data;
        console.log('this is the main controller' + data);
        $scope.places = data;
    });

    $scope.updatePlace = function(place, index){
        $scope.places[index].editing = false;
        $scope.places.editing = false;
        dataService.updatePlace(place);
        console.log('save updated place' + place.title);
    };

    //tell data sevice to delete existing place

   $scope.deletePlace = function(place, index) {
      dataService.deletePlace(place).then(function() {
        $scope.places.splice(index, 1);
      });
    };

    //Show the users created places

    $scope.showMyPlaces = function(path){
        console.log('show my places');
        $location.path('/loggedin/mycreatedplaces');
    }

    //filter on type of places

    $scope.filterPlaces = function(place){
      console.log(place.type_of_place.name);
      $scope.placeType = place.type_of_place.name;
    }

    //filter on areas

    $scope.filterAreas = function(place){
      console.log(place.area.name);
      $scope.undergroundArea = place.area.name;
    }

    $scope.showNewUserDialog = function(ev) {
        $mdDialog.show({
            templateUrl: 'templates/new-user-dialog.html',
            parent: angular.element(document.body),
            scope: $scope,
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen //only for xs and sm breakpoints.
        });
    };

    $scope.showLoginDialog = function(ev) {
        $mdDialog.show({
            templateUrl: 'templates/login-dialog.html',
            parent: angular.element(document.body),
            scope: $scope,
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen //only for xs and sm breakpoints.
        });
    };

    $scope.showAddDialog = function(ev) {
        $mdDialog.show({
            templateUrl: 'templates/add-dialog.html',
            parent: angular.element(document.body),
            scope: $scope,
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen //only for xs and sm breakpoints.
        });
    };


    $scope.hide = function() {
          $mdDialog.hide();
        };

        //add new user

        $scope.addNewUser = function(path){
            var data = {
                username: $scope.user.username,
                password: $scope.user.password
            };

            dataService.createUser(data);
            console.log("Add user" + data);
            $rootScope.$on('userError', function(event,message){
                //console.log('this is the event: ' + message);
                $scope.fieldError = message;
            });
        };

        //login

        $scope.authenticate = function(path){
            var data = {
                username: $scope.user.username,
                password: $scope.user.password
            };

            dataService.authenticate(data).then(function(res){
                console.log("Authenticate user" + res.data.user);

                if(res.data.success){
                    $mdDialog.hide();
                    $location.path('/loggedin');
                    dataService.postUserSession(res.data);
                    $rootScope.$emit('userSession', res.data.user);
                } else {
                    $scope.fieldError = res.data.message;
                }

            });

        };

        //add new place

        $scope.createPlace = function(){
            var data = {
                title: $scope.place.title,
                description: $scope.place.description,
                location: $scope.place.location,
                area: $scope.place.area.name,
                type_of_place: $scope.place.type_of_place.name,
            };

            dataService.createPlace(data).then(function(res) {
                console.log(res.data);
                $scope.places.push(res.data);
                $mdDialog.hide();
            });
        };

        //Fetch data from backend

        $http.get('/api/typeOfPlace').then(function(res){
            $scope.typeOfPlace = res.data.typeOfPlace;
        });

        $http.get('/api/areas').then(function(res){
            $scope.areas = res.data.areas;
       });
});

app.controller('filterController', function($http, $scope){

    $http.get('/api/areas').then(function(res){
      $scope.areas = res.data.areas;
    });

    $http.get('/api/typeOfPlace').then(function(res){
      $scope.typeOfPlace = res.data.typeOfPlace;
    });

});
