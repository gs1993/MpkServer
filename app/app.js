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
            when('/bus/show', {
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

    //STANDARDOWE CONTROLLERY
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

    //AUTOBUS CONTROLLERY
    app.controller('BusController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });
    
    
    app.controller('AddBusController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });
    
    app.controller('ShowBusController', function($scope) {

        $scope.Bus = {
            Id: 0,
            RegistrationNumber: '12345',
            VINNumber: '24122345',
            BusType: 0,
            GotMachine: true
        };
        $scope.Bus.BusTypeName = "Normalny";
        $scope.Bus.GotMachineName = "Tak";

    });

    //PRZYSTANKI CONTROLLERY
    app.controller('BusstopController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('AddBusstopController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('ShowBusstopController', function($scope) {

        $scope.message = 'This is Add new order screen';

    });

    //USERS CONTROLLERY
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