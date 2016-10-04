app.controller('dialogController', function($http, $scope, $mdDialog, dataService, $rootScope, $location, $route){

    $scope.showNewUserDialog = function(ev) {
        $mdDialog.show({
            templateUrl: 'templates/new-user-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen //only for xs and sm breakpoints.
        });
    };

    $scope.showLoginDialog = function(ev) {
        $mdDialog.show({
            templateUrl: 'templates/login-dialog.html',
            parent: angular.element(document.body),
            scope: $scope,
            preserveScope: true,
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
            preserveScope: true,
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen //only for xs and sm breakpoints.
        });
    };


    //add new user

    $scope.addNewUser = function(path){
        var data = {
            username: $scope.user.username,
            password: $scope.user.password
        };

        dataService.createUser(data).then(function(res){
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

    //login

    $scope.authenticate = function(path){
        var data = {
            username: $scope.user.username,
            password: $scope.user.password
        };

        dataService.authenticate(data).then(function(res){
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

});