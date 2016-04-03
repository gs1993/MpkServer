/**
 * Created by msobiecki on 02.04.16.
 */
(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home.html',
                controllerAs: 'vm'
            })
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'home.html',
                controllerAs: 'vm'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'panelLogin.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'panelRegister.html',
                controllerAs: 'vm'
            })
            .when('/forgot', {
                controller: '',
                templateUrl: 'panelResetPassword.html',
                controllerAs: ''
            })
            .when('/bus', {
                controller: '',
                templateUrl: 'panelAutobusy.html',
                controllerAs: ''
            })
            .when('/busstop', {
                controller: '',
                templateUrl: 'panelPrzystanki.html',
                controllerAs: ''
            })
            .when('/users', {
                controller: '',
                templateUrl: 'panelUsers.html',
                controllerAs: ''
            })
            .when('/welcome', {
                controller: '',
                templateUrl: 'panelWelcome.html',
                controllerAs: ''
            })

            .otherwise({ redirectTo: '/home' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/welcome','/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/welcome');
            }
        });
    }

})();