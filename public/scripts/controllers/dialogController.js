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
                location: $scope.place.location,
                area: $scope.place.area.name,
                type_of_place: $scope.place.type_of_place.name
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

        $scope.typeOfPlace = [
            { name: 'Badplats' },
            { name: 'Restaurang/café' },
            { name: 'Shopping' },
            { name: 'Friluftsliv' },
            { name: 'Utsiktsplats' },
            { name: 'Promenadstråk' },
            { name: 'Park/Trädgård' },
            { name: 'Museum' },
            { name: 'Sevärdhet' },
            { name: 'Övrigt' },
        ];

        $scope.areas = [
          { name: "Medborgarplatsen" },
          { name: "Skanstull" },
          { name: "Gullmarsplan" },
          { name: "Skärmarbrink" },
          { name: "Blåsut" },
          { name: "Sandsborg" },
          { name: "Skogskyrkogården" },
          { name: "Tallkrogen" },
          { name: "Gubbängen" },
          { name: "Hökarängen" },
          { name: "Globen" },
          { name: "Enskede gård" },
          { name: "Sockenplan" },
          { name: "Svedmyra" },
          { name: "Stureby" },
          { name: "Hötorget" },
          { name: "Rådmansgatan" },
          { name: "Odenplan" },
          { name: "Sankt Eriksplan" },
          { name: "Fridhemsplan" },
          { name: "Thorildsplan" },
          { name: "Kristineberg" },
          { name: "Alvik" },
          { name: "Stora mossen" },
          { name: "Abrahamsberg" },
          { name: "Brommaplan" },
          { name: "Åkeshov" },
          { name: "Ängbyplan" },
          { name: "Islandstorget" },
          { name: "Blackeberg" },
          { name: "Råcksta" },
          { name: "Vällingby" },
          { name: "Bandhagen" },
          { name: "Högdalen" },
          { name: "Johannelund" },
          { name: "Hässelby gård" },
          { name: "T-Centralen" },
          { name: "Gamla stan" },
          { name: "Hammarbyhöjden" },
          { name: "Björkhagen" },
          { name: "Kärrtorp" },
          { name: "Bagarmossen" },
          { name: "Farsta" },
          { name: "Hässelby strand" },
          { name: "Rågsved" },
          { name: "Hagsätra" },
          { name: "T-Centralen" },
          { name: "Gamla stan" },
          { name: "Slussen" },
          { name: "Mariatorget" },
          { name: "Zinkensdamm" },
          { name: "Hornstull" },
          { name: "Liljeholmen" },
          { name: "Midsommarkransen" },
          { name: "Telefonplan" },
          { name: "Hägerstensåsen" },
          { name: "Västertorp" },
          { name: "Fruängen" },
          { name: "Aspudden" },
          { name: "Örnsberg" },
          { name: "Axelsberg" },
          { name: "Mälarhöjden" },
          { name: "Bredäng" },
          { name: "Sätra" },
          { name: "Östermalmstorg" },
          { name: "Karlaplan" },
          { name: "Gärdet" },
          { name: "Ropsten" },
          { name: "Skärholmen" },
          { name: "Vårberg" },
          { name: "Farsta strand" },
          { name: "Vårby gård" },
          { name: "Masmo" },
          { name: "Fittja" },
          { name: "Stadion" },
          { name: "Tekniska högskolan" },
          { name: "Universitetet" },
          { name: "Alby" },
          { name: "Hallunda" },
          { name: "Norsborg" },
          { name: "T-Centralen" },
          { name: "Rådhuset" },
          { name: "Fridhemsplan" },
          { name: "Stadshagen" },
          { name: "Västra skogen" },
          { name: "Solna centrum" },
          { name: "Näckrosen" },
          { name: "Hallonbergen" },
          { name: "Rinkeby" },
          { name: "Tensta" },
          { name: "Hjulsta" },
          { name: "Kista" },
          { name: "Husby" },
          { name: "Akalla" },
          { name: "Kungsträdgården" },
          { name: "Bergshamra" },
          { name: "Danderyds sjukhus" },
          { name: "Mörby centrum" },
          { name: "Huvudsta" },
          { name: "Solna strand" },
          { name: "Sundbybergs centrum" },
          { name: "Duvbo" },
          { name: "Rissne" },
          { name: "Skarpnäck" }
        ];
    }

});
