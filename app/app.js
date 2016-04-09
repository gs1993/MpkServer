/**
 * Created by msobiecki on 02.04.16.
 */
(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider','$locationProvider',
        function($routeProvider,$locationProvider) {
            $routeProvider.

            //STANDARDOWE SCIEZKI
            when('/', {
                templateUrl: 'home.html',
                controller: 'HomeController'
            }).
            when('/home', {
                templateUrl: 'home.html',
                controller: 'HomeController'
            }).
            when('/login', {
                templateUrl: 'panelLogin.html',
                controller: 'LoginController'
            }).
            when('/register', {
                templateUrl: 'panelRegister.html',
                controller: 'RegisterController'
            }).
            when('/forgot', {
                templateUrl: 'panelResetPassword.html',
                controller: 'ResetPasswordController'
            }).


            //AUTOBUS SCIEZKI
            when('/bus', {
                templateUrl: 'panelAutobusy.html',
                controller: 'BusController',
                activetab: 'bus'
            }).
            when('/bus/add', {
                templateUrl: 'panelDodajAutobus.html',
                controller: 'AddBusController'
            }).
            when('/bus/show/:id', {
                templateUrl: 'panelWyswietlAutobus.html',
                controller: 'ShowBusController'
            }).
            //PRZYSTANKI SCIEZKI
            when('/busstop', {
                templateUrl: 'panelPrzystanki.html',
                controller: 'BusstopController'
            }).
            when('/busstop/add', {
                templateUrl: 'panelDodajPrzystanek.html',
                controller: 'AddBusstopController'
            }).
            when('/busstop/show/:id', {
                templateUrl: 'panelWyswietlPrzystanek.html',
                controller: 'ShowBusstopController'
            }).

            //UZYTKOWNICY SCIEZKI
            when('/user', {
                templateUrl: 'panelUsers.html',
                controller: 'UserController'
            }).
            when('/user/add', {
                templateUrl: 'panelDodajUser.html',
                controller: 'AddUserController'
            }).
            when('/user/show', {
                templateUrl: 'panelWyswietlUser.html',
                controller: 'ShowUserController'
            }).

            otherwise({
                redirectTo: '/home'
            });
        }]);

    /* Standardowe Controlery
     *==========================================================================*/
    app.controller('HomeController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('LoginController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });
    
    
    app.controller('RegisterController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });
    
    
    app.controller('ResetPasswordController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });

    /* Autobusy Controlery
     *==========================================================================*/
    app.controller('BusController', function($scope) {

        $scope.autobusy = [
            { Id: 0, RegistrationNumber: 'NO123456', BusNumber:'123213', BusStatus: 0, GotMachine: false, BusType: 1, LastControl: '1'},
            { Id: 1, RegistrationNumber: 'NO234567', BusNumber:'1231123', BusStatus: 1, GotMachine: true, BusType: 0, LastControl: '1'},
            { Id: 2, RegistrationNumber: 'NKE434354', BusNumber:'1234243',BusStatus: 2, GotMachine: true, BusType: 1, LastControl: '1'},
            { Id: 2, RegistrationNumber: 'NMR434354', BusNumber:'14232234',BusStatus: 2, GotMachine: true, BusType: 1, LastControl: '1'},
            { Id: 3, RegistrationNumber: 'NO1354543', BusNumber:'1234342',BusStatus: 3, GotMachine: true, BusType: 0, LastControl: '1'}
        ];
        angular.forEach($scope.autobusy, function (autobus) {
            if(autobus.GotMachine == true)
            {
                autobus.GotMachineName = "Tak";
                autobus.GotMachineValue = 1
            }
            else
            {
                autobus.GotMachineName = "Nie";
                autobus.GotMachineValue = 0
            }

            if(autobus.BusType == 0)
            {
                autobus.BusTypeName = "Normalny"
            }
            else
            {
                autobus.BusTypeName = "Przegubowy"
            }
            if(autobus.BusStatus == 0)
            {
                autobus.BusStatusName = "Nieaktywny"
            }
            else if(autobus.BusStatus == 1)
            {
                autobus.BusStatusName = "W zajezdni"
            }
            else
            {
                autobus.BusStatusName = "W trasie"
            }
        });

    });
    
    
    app.controller('AddBusController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });
    
    app.controller('ShowBusController', ['$scope', '$routeParams', function($scope, $routeParams) {

        var WybraneId = $routeParams.id;

        //WYSYLANY ID
        $scope.AutobusID = WybraneId;


        //ZWROTKA
        $scope.autobus = [{ Id: 0, RegistrationNumber: 'NO123456', BusNumber:'1231123', BusStatus: 0, GotMachine: false, BusType: 1, LastControl: '1'}];
        angular.forEach($scope.autobus, function (item) {
            if(item.GotMachine == true)
            {
                item.GotMachineName = "Tak";
                item.GotMachineValue = 1
            }
            else
            {
                item.GotMachineName = "Nie";
                item.GotMachineValue = 0
            }

            if(item.BusType == 0)
            {
                item.BusTypeName = "Normalny"
            }
            else
            {
                item.BusTypeName = "Przegubowy"
            }
            if(item.BusStatus == 0)
            {
                item.BusStatusName = "Nieaktywny"
            }
            else if(item.BusStatus == 1)
            {
                item.BusStatusName = "W zajezdni"
            }
            else
            {
                item.BusStatusName = "W trasie"
            }
        });
    }]);
    app.controller('UpdateBusController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });

    /* Przystanki Controlery
     *==========================================================================*/
    app.controller('BusstopController', function($scope) {

        $scope.przystanki = [
            { Id: 0, Name: 'Słoneczna', Lat: 12.58, Lng: 50.23, LocalizationString: "ul. Warszawska", GotMachine: false, GotKiosk: false, BusStopType: 0, BusStopStatus: 0, LastControl: '1'},
            { Id: 1, Name: 'Świetlista', Lat: 12.58, Lng: 50.23, LocalizationString: "ul. Świetlista 54", GotMachine: true, GotKiosk: false, BusStopType: 0, BusStopStatus: 1, LastControl: '1'},
            { Id: 2, Name: 'Dworcowa', Lat: 12.58, Lng: 50.23, LocalizationString: "ul. Dworcowa 23", GotMachine: false, GotKiosk: true, BusStopType: 1, BusStopStatus: 0, LastControl: '1'},
            { Id: 3, Name: 'Stomil', Lat: 12.58, Lng: 50.23, LocalizationString: "ul. Nie wiem gdzie", GotMachine: true, GotKiosk: true, BusStopType: 1, BusStopStatus: 1, LastControl: '1'},
            { Id: 4, Name: 'Wysoka Brama', Lat: 12.58, Lng: 50.23, LocalizationString: "ul. Wysoka", GotMachine: false, GotKiosk: false, BusStopType: 1, BusStopStatus: 1, LastControl: '1'}
        ];
        angular.forEach($scope.przystanki, function (przystanek) {
            if(przystanek.GotMachine == true)
            {
                przystanek.GotMachineName = "Tak";
                przystanek.GotMachineValue = 1
            }
            else
            {
                przystanek.GotMachineName = "Nie";
                przystanek.GotMachineValue = 0
            }
            if(przystanek.GotKiosk == true)
            {
                przystanek.GotKioskName = "Tak";
                przystanek.GotKioskValue = 1
            }
            else
            {
                przystanek.GotKioskName = "Nie";
                przystanek.GotKioskValue = 0
            }

            if(przystanek.BusStopType == 0)
            {
                przystanek.BusStopTypeName = "Normalny"
            }
            else
            {
                przystanek.BusStopTypeName = "Zabudowany"
            }
            if(przystanek.BusStopStatus == 0)
            {
                przystanek.BusStopStatusName = "Nieaktywny"
            }
            else
            {
                przystanek.BusStopStatusName = "Aktywny"
            }
        });

    });


    app.controller('AddBusstopController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('ShowBusstopController', ['$scope', '$routeParams', function($scope, $routeParams) {

        var WybraneId = $routeParams.id;

        //WYSYLANY ID
        $scope.PrzystanekID = WybraneId;


        //ZWROTKA
        $scope.przystanek = [{ Id: 0, Name: 'Słoneczna', Lat: 12.58, Lng: 50.23, LocalizationString: "ul. Warszawska", GotMachine: false, GotKiosk: false, BusStopType: 0, BusStopStatus: 0, LastControl: '1'}];
        angular.forEach($scope.przystanek, function (item) {
            if(item.GotMachine == true)
            {
                item.GotMachineName = "Tak";
                item.GotMachineValue = 1
            }
            else
            {
                item.GotMachineName = "Nie";
                item.GotMachineValue = 0
            }
            if(item.GotKiosk == true)
            {
                item.GotKioskName = "Tak";
                item.GotKioskValue = 1
            }
            else
            {
                item.GotKioskName = "Nie";
                item.GotKioskValue = 0
            }

            if(item.BusStopType == 0)
            {
                item.BusStopTypeName = "Normalny"
            }
            else
            {
                item.BusStopTypeName = "Zabudowany"
            }
            if(item.BusStopStatus == 0)
            {
                item.BusStopStatusName = "Nieaktywny"
            }
            else
            {
                item.BusStopStatusName = "Aktywny"
            }
        });
    }]);

    /* Użytkownicy Controlery
     *==========================================================================*/
    app.controller('UserController', function($scope) {

        $scope.users = [
            { Id: 0, Email: 'dev@wp.pl', Rank: 0, Status: 0, Details: "Opis...?"},
            { Id: 1, Email: 'dev2@wp.pl', Rank: 1, Status: 1, Details: "Opis...?"},
            { Id: 1, Email: 'dev2@wp.pl', Rank: 1, Status: 1, Details: "Opis...?"},
            { Id: 2, Email: 'dev3@wp.pl', Rank: 2, Status: 0, Details: "Opis...?"}
        ];
        angular.forEach($scope.users, function (user) {
            if(user.Rank == 0)
            {
                user.RankName = "Użytkownik";
            }
            else if(user.Rank == 1)
            {
                user.RankName = "Kontroler";
            }
            else if(user.Rank == 2)
            {
                user.RankName = "Administrator";
            }
            if(user.Status == 0)
            {
                user.StatusName = "Nieaktywny"
            }
            else
            {
                user.StatusName = "Aktywny"
            }
        });

    });


    app.controller('AddUserController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('ShowUserController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });
    
})();