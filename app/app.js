/**
 * Created by msobiecki on 02.04.16.
 */
(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(['$routeProvider',
        function($routeProvider) {
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
            when('/busstop/show', {
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
    app.controller('Updatei na BusController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });

    /* Przystanki Controlery
     *==========================================================================*/
    app.controller('BusstopController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('AddBusstopController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('ShowBusstopController', function($scope, ID) {

        $scope.message = 'This is Add new order screen';

    });

    /* Użytkownicy Controlery
     *==========================================================================*/
    app.controller('UserController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('AddUserController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('ShowUserController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });
    
})();