/**
 * Created by msobiecki on 02.04.16.
 */
(function () {
    'use strict';
    var app = angular.module('app', ['ngRoute', 'ngMap']);

    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.//STANDARDOWE SCIEZKI
            when('/', {
                templateUrl: 'home.html',
                controller: 'HomeController'
            }).when('/home', {
                templateUrl: 'home.html',
                controller: 'HomeController'
            }).when('/login', {
                templateUrl: 'panelLogin.html',
                controller: 'LoginController'
            }).when('/register', {
                templateUrl: 'panelRegister.html',
                controller: 'RegisterController'
            }).when('/forgot', {
                templateUrl: 'panelResetPassword.html',
                controller: 'ResetPasswordController'
            }).//AUTOBUS SCIEZKI
            when('/bus', {
                templateUrl: 'panelAutobusy.html',
                controller: 'BusController',
                activetab: 'bus'
            }).when('/bus/add', {
                templateUrl: 'panelDodajAutobus.html',
                controller: 'AddBusController'
            }).when('/bus/show/:id', {
                templateUrl: 'panelWyswietlAutobus.html',
                controller: 'ShowBusController'
            }).//PRZYSTANKI SCIEZKI
            when('/busstop', {
                templateUrl: 'panelPrzystanki.html',
                controller: 'BusstopController'
            }).when('/busstop/add', {
                templateUrl: 'panelDodajPrzystanek.html',
                controller: 'AddBusstopController'
            }).when('/busstop/show/:id', {
                templateUrl: 'panelWyswietlPrzystanek.html',
                controller: 'ShowBusstopController'
            }).//UZYTKOWNICY SCIEZKI
            when('/user', {
                templateUrl: 'panelUsers.html',
                controller: 'UserController'
            }).when('/user/add', {
                templateUrl: 'panelDodajUser.html',
                controller: 'AddUserController'
            }).when('/user/show/:id', {
                templateUrl: 'panelWyswietlUser.html',
                controller: 'ShowUserController'
            }).otherwise({
                redirectTo: '/home'
            });
        }]);

    /* Standardowe Controlery
     *==========================================================================*/
    app.controller('HomeController', function ($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('LoginController', function ($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('RegisterController', function ($scope) {

        $scope.message = 'This is Add new order screen';

    });


    app.controller('ResetPasswordController', function ($scope) {

        $scope.message = 'This is Add new order screen';

    });

    /* Autobusy Controlery
     *==========================================================================*/
    app.controller('BusController', function ($scope, $http) {

        $scope.autobusy = [
            {
                Id: 0,
                RegistrationNumber: 'NO123456',
                BusNumber: '123213',
                BusStatus: 0,
                GotMachine: false,
                BusType: 1,
                LastControl: '1'
            },
            {
                Id: 1,
                RegistrationNumber: 'NO234567',
                BusNumber: '1231123',
                BusStatus: 1,
                GotMachine: true,
                BusType: 0,
                LastControl: '1'
            },
            {
                Id: 2,
                RegistrationNumber: 'NKE434354',
                BusNumber: '1234243',
                BusStatus: 2,
                GotMachine: true,
                BusType: 1,
                LastControl: '1'
            },
            {
                Id: 2,
                RegistrationNumber: 'NMR434354',
                BusNumber: '14232234',
                BusStatus: 2,
                GotMachine: true,
                BusType: 1,
                LastControl: '1'
            },
            {
                Id: 3,
                RegistrationNumber: 'NO1354543',
                BusNumber: '1234342',
                BusStatus: 3,
                GotMachine: true,
                BusType: 0,
                LastControl: '1'
            }
        ];

        $http.get('http://localhost:50000/bus/GetBusList', {
            headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
        }).success(function (data, status, headers, config) {
            $scope.autobusy = data;
            console.log("Pobrano liste autobusów.")
        }).error(function (data, status, headers, config) {
            console.log("Błąd pobrania Autobusów.")
        });

        angular.forEach($scope.autobusy, function (autobus) {
            if (autobus.GotMachine == true) {
                autobus.GotMachineName = "Tak";
                autobus.GotMachineValue = 1
            }
            else {
                autobus.GotMachineName = "Nie";
                autobus.GotMachineValue = 0
            }

            if (autobus.BusType == 0) {
                autobus.BusTypeName = "Normalny"
            }
            else {
                autobus.BusTypeName = "Przegubowy"
            }
            if (autobus.BusStatus == 0) {
                autobus.BusStatusName = "Nieaktywny"
            }
            else if (autobus.BusStatus == 1) {
                autobus.BusStatusName = "W zajezdni"
            }
            else {
                autobus.BusStatusName = "W trasie"
            }
        });

    });
    app.controller('AddBusController', function ($scope, $http, $timeout) {
        $scope.sendForm = false;

        $scope.createBus = function () {
            $scope.sendForm = true;
            if ($scope.BusType == "1") {
                $scope.BusType = 1;
            }
            else {
                $scope.BusType = 0;
            }
            if ($scope.GotMachine == "1") {
                $scope.GotMachine = true;
            }
            else {
                $scope.GotMachine = false;
            }
            var data = $.param({
                RegistrationNumber: $scope.RegistrationNumber,
                BusNumber: $scope.BusNumber,
                BusType: $scope.BusType,
                GotMachine: $scope.GotMachine,
                BusStatus: 0
                //LastControl: ''
            });
            var config = {
                headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
            };

            if ($scope.sendForm) {
                $scope.message = "Przygotowywanie autobusu do drogi...";

                $timeout(function () {
                    $http.post('http://localhost:50000/bus/addBus', data, config)
                        .success(function (data, status, headers, config) {
                            $scope.CallbackServera = true;
                            $scope.CallbackServeraPositive = true;
                            $scope.PostDataResponse = data;
                            console.log($scope.PostDataResponse);
                        })
                        .error(function (data, status, header, config) {
                            $scope.ResponseDetails = "Data: " + data +
                                "<hr />status: " + status +
                                "<hr />headers: " + header +
                                "<hr />config: " + config;
                            console.log($scope.ResponseDetails);
                            $scope.CallbackServera = true;
                            $scope.CallbackServeraNegative = true;
                        });
                }, 2500);
            }
        };
    });
    app.controller('ShowBusController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

        var WybraneId = $routeParams.id;

        //WYSYLANY ID
        $scope.AutobusID = WybraneId;

        //ZWROTKA
        $scope.autobus = [{
            Id: 0,
            RegistrationNumber: 'NO123456',
            BusNumber: '1231123',
            BusStatus: 0,
            GotMachine: false,
            BusType: 1,
            LastControl: '1'
        }];
        $http.get('http://localhost:50000/bus/getBus/' + WybraneId, {
                headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
            }
        ).success(function (data, status, headers, config) {
            $scope.autobus = data;
            console.log("Pobrano autobus.")
        }).error(function (data, status, headers, config) {
            console.log("Błąd pobrania autobusu.")
        });

        angular.forEach($scope.autobus, function (item) {
            if (item.GotMachine == true) {
                item.GotMachineName = "Tak";
                item.GotMachineValue = 1
            }
            else {
                item.GotMachineName = "Nie";
                item.GotMachineValue = 0
            }

            if (item.BusType == 0) {
                item.BusTypeName = "Normalny"
            }
            else {
                item.BusTypeName = "Przegubowy"
            }
            if (item.BusStatus == 0) {
                item.BusStatusName = "Nieaktywny"
            }
            else if (item.BusStatus == 1) {
                item.BusStatusName = "W zajezdni"
            }
            else {
                item.BusStatusName = "W trasie"
            }
        });
    }]);
    app.controller('UpdateBusController', function ($scope) {

        $scope.busToUpdate = [{}];

        $scope.updateBus = function () {
            angular.forEach($scope.busToUpdate, function (item) {
                angular.forEach($scope.autobus, function (item2) {
                    //Dopisywanie pustych z rodzica

                    if (item.Id == null) {
                        item.Id = item2.Id;
                    }
                    if (item.RegistrationNumber == null) {
                        item.RegistrationNumber = item2.RegistrationNumber;
                    }
                    if (item.BusNumber == null) {
                        item.BusNumber = item2.BusNumber;
                    }

                    item.BusStatus = item2.BusStatus

                    if (item.BusType == null) {
                        item.BusType = item2.BusType;
                    }
                    if (item.GotMachine == null) {
                        item.GotMachine = item2.GotMachine;
                    }

                    item.LastControl = item2.LastControl;

                    //Zamiana wartosci

                    if (item.BusType == "1") {
                        item.BusType = 1;
                    }
                    else {
                        item.BusType = 0;
                    }
                    if (item.GotMachine == 1) {
                        item.GotMachine = true;
                    }
                    else {
                        item.GotMachine = false;
                    }

                });
            });

            console.log($scope.busToUpdate);
            console.log($scope.autobus);

        };

    });
    app.controller('RestoreBusController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    }]);
    app.controller('DeleteBusController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    }]);

    /* Przystanki Controlery
     *==========================================================================*/
    app.controller('BusstopController', function ($scope, $http) {

        $scope.przystanki = [
            {
                Id: 0,
                Name: 'Słoneczna',
                Lat: 12.58,
                Lng: 50.23,
                LocalizationString: "ul. Warszawska",
                GotMachine: false,
                GotKiosk: false,
                BusStopType: 0,
                BusStopStatus: 0,
                LastControl: '1'
            },
            {
                Id: 1,
                Name: 'Świetlista',
                Lat: 12.58,
                Lng: 50.23,
                LocalizationString: "ul. Świetlista 54",
                GotMachine: true,
                GotKiosk: false,
                BusStopType: 0,
                BusStopStatus: 1,
                LastControl: '1'
            },
            {
                Id: 2,
                Name: 'Dworcowa',
                Lat: 12.58,
                Lng: 50.23,
                LocalizationString: "ul. Dworcowa 23",
                GotMachine: false,
                GotKiosk: true,
                BusStopType: 1,
                BusStopStatus: 0,
                LastControl: '1'
            },
            {
                Id: 3,
                Name: 'Stomil',
                Lat: 12.58,
                Lng: 50.23,
                LocalizationString: "ul. Nie wiem gdzie",
                GotMachine: true,
                GotKiosk: true,
                BusStopType: 1,
                BusStopStatus: 1,
                LastControl: '1'
            },
            {
                Id: 4,
                Name: 'Wysoka Brama',
                Lat: 12.58,
                Lng: 50.23,
                LocalizationString: "ul. Wysoka",
                GotMachine: false,
                GotKiosk: false,
                BusStopType: 1,
                BusStopStatus: 1,
                LastControl: '1'
            }
        ];

        $http.get('http://localhost:50000/busstop/GetBusstopList', {
            headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
        }).success(function (data, status, headers, config) {
            $scope.przystanki = data;
            console.log("Pobrano liste przystanków.")
        }).error(function (data, status, headers, config) {
            console.log("Błąd pobrania przystanków.")
        });

        angular.forEach($scope.przystanki, function (przystanek) {
            if (przystanek.GotMachine == true) {
                przystanek.GotMachineName = "Tak";
                przystanek.GotMachineValue = 1
            }
            else {
                przystanek.GotMachineName = "Nie";
                przystanek.GotMachineValue = 0
            }
            if (przystanek.GotKiosk == true) {
                przystanek.GotKioskName = "Tak";
                przystanek.GotKioskValue = 1
            }
            else {
                przystanek.GotKioskName = "Nie";
                przystanek.GotKioskValue = 0
            }

            if (przystanek.BusStopType == 0) {
                przystanek.BusStopTypeName = "Normalny"
            }
            else {
                przystanek.BusStopTypeName = "Zabudowany"
            }
            if (przystanek.BusStopStatus == 0) {
                przystanek.BusStopStatusName = "Nieaktywny"
            }
            else {
                przystanek.BusStopStatusName = "Aktywny"
            }
        });

    });
    app.controller('AddBusstopController', function ($scope, $http, $timeout) {
        $scope.sendForm = false;

        $scope.createBusstop = function () {
            $scope.sendForm = true;
            $scope.Lat = parseFloat($scope.Lat);
            $scope.Lng = parseFloat($scope.Lng);
            //Zamiana wartosci
            if ($scope.GotMachine == 1) {
                $scope.GotMachine = true;
            }
            else {
                $scope.GotMachine = false;
            }

            if ($scope.GotMachine == 1) {
                $scope.GotMachine = true;
            }
            else {
                $scope.GotMachine = false;
            }
            if ($scope.GotKiosk == 1) {
                $scope.GotKiosk = true;
            }
            else {
                $scope.GotKiosk = false;
            }

            if ($scope.BusStopType == "0") {
                $scope.BusStopType = 0
            }
            else {
                $scope.BusStopType = 1
            }

            var data = $.param({
                Name: $scope.Name,
                Lat: $scope.Lat,
                Lng: $scope.Lng,
                LocalizationString: $scope.LocalizationString,
                GotMachine: $scope.GotMachine,
                GotKiosk: $scope.GotKiosk,
                BusStopType: $scope.BusStopType,
                BusStopStatus: 0
                //LastControl: ''
            });
            var config = {
                headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
            };

            if ($scope.sendForm) {
                $scope.message = "Przygotowywanie przystanku...";
                $timeout(function () {
                    $http.post('http://localhost:50000/bus/addBusstop', data, config)
                        .success(function (data, status, headers, config) {
                            $scope.PostDataResponse = data;
                            console.log($scope.PostDataResponse);
                            $scope.CallbackServeraPositive = true;
                            $scope.CallbackServera = true;
                        })
                        .error(function (data, status, header, config) {
                            $scope.ResponseDetails = "Data: " + data +
                                "<hr />status: " + status +
                                "<hr />headers: " + header +
                                "<hr />config: " + config;
                            console.log($scope.ResponseDetails);
                            $scope.CallbackServeraNegative = true;
                            $scope.CallbackServera = true;
                        });
                }, 2500);
            }
        };
    });
    app.controller('ShowBusstopController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

        var WybraneId = $routeParams.id;

        //WYSYLANY ID
        $scope.PrzystanekID = WybraneId;

        //ZWROTKA
        $scope.przystanek = [{
            Id: 0,
            Name: 'Słoneczna',
            Lat: 12.58,
            Lng: 50.23,
            LocalizationString: "ul. Warszawska",
            GotMachine: false,
            GotKiosk: false,
            BusStopType: 0,
            BusStopStatus: 0,
            LastControl: '1'
        }];

        $http.get('http://localhost:50000/busstop/getBusstop/' + WybraneId, {
                headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
            }
        ).success(function (data, status, headers, config) {
            $scope.autobus = data;
            console.log("Pobrano przystanek.")
        }).error(function (data, status, headers, config) {
            console.log("Błąd pobrania przystanku.")
        });

        angular.forEach($scope.przystanek, function (item) {
            if (item.GotMachine == true) {
                item.GotMachineName = "Tak";
                item.GotMachineValue = 1
            }
            else {
                item.GotMachineName = "Nie";
                item.GotMachineValue = 0
            }
            if (item.GotKiosk == true) {
                item.GotKioskName = "Tak";
                item.GotKioskValue = 1
            }
            else {
                item.GotKioskName = "Nie";
                item.GotKioskValue = 0
            }

            if (item.BusStopType == 0) {
                item.BusStopTypeName = "Normalny"
            }
            else {
                item.BusStopTypeName = "Zabudowany"
            }
            if (item.BusStopStatus == 0) {
                item.BusStopStatusName = "Nieaktywny"
            }
            else {
                item.BusStopStatusName = "Aktywny"
            }
        });
    }]);
    app.controller('UpdateBustopController', function ($scope) {

        //$scope.message = 'This is Add new order screen';
        $scope.busstopToUpdate = [{}];

        $scope.updateBusstop = function () {
            angular.forEach($scope.busstopToUpdate, function (item) {
                angular.forEach($scope.przystanek, function (item2) {

                    if (item.Id == null) {
                        item.Id = item2.Id;
                    }
                    if (item.Name == null) {
                        item.Name = item2.Name;
                    }
                    if (item.Lat == null) {
                        item.Lat = item2.Lat;
                    }

                    if (item.Lng == null) {
                        item.Lng = item2.Lng;
                    }
                    if (item.LocalizationString == null) {
                        item.LocalizationString = item2.LocalizationString;
                    }
                    if (item.GotMachine == null) {
                        item.GotMachine = item2.GotMachine;
                    }
                    if (item.GotKiosk == null) {
                        item.GotKiosk = item2.GotKiosk;
                    }
                    if (item.BusStopType == null) {
                        item.BusStopType = item2.BusStopType;
                    }
                    item.BusStopStatus = item2.BusStopStatus;
                    item.LastControl = item2.LastControl;

                    //Zamiana wartosci

                    item.Lat = parseFloat(item.Lat);
                    item.Lng = parseFloat(item.Lng);

                    if (item.GotMachine == 1) {
                        item.GotMachine = true;
                    }
                    else {
                        item.GotMachine = false;
                    }

                    if (item.GotMachine == 1) {
                        item.GotMachine = true;
                    }
                    else {
                        item.GotMachine = false;
                    }
                    if (item.GotKiosk == 1) {
                        item.GotKiosk = true;
                    }
                    else {
                        item.GotKiosk = false;
                    }

                    if (item.BusStopType == "0") {
                        item.BusStopType = 0
                    }
                    else {
                        item.BusStopType = 1
                    }
                    //czy przy tworzeniu powinnen być status???


                });
            });


            console.log($scope.busstopToUpdate);


        };

    });
    app.controller('RestoreBusstopController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    }]);
    app.controller('DeleteBusstopController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    }]);

    /* Użytkownicy Controlery
     *==========================================================================*/
    app.controller('UserController', function ($scope, $http) {

        $scope.users = [
            {Id: 0, Email: 'dev@wp.pl', Rank: 0, Status: 0, Details: "Opis...?"},
            {Id: 1, Email: 'dev2@wp.pl', Rank: 1, Status: 1, Details: "Opis...?"},
            {Id: 1, Email: 'dev2@wp.pl', Rank: 1, Status: 1, Details: "Opis...?"},
            {Id: 2, Email: 'dev3@wp.pl', Rank: 2, Status: 0, Details: "Opis...?"}
        ];

        $http.get('http://localhost:50000/user/GetUserList', {
            headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
        }).success(function (data, status, headers, config) {
            $scope.users = data;
            console.log("Pobrano liste userów.")
        }).error(function (data, status, headers, config) {
            console.log("Błąd pobrania userów.")
        });

        angular.forEach($scope.users, function (user) {
            if (user.Rank == 0) {
                user.RankName = "Użytkownik";
            }
            else if (user.Rank == 1) {
                user.RankName = "Kontroler";
            }
            else if (user.Rank == 2) {
                user.RankName = "Administrator";
            }
            if (user.Status == 0) {
                user.StatusName = "Nieaktywny"
            }
            else {
                user.StatusName = "Aktywny"
            }
        });

    });
    app.controller('AddUserController', function ($scope, $http, $timeout) {
        $scope.sendForm = false;

        $scope.createUser = function () {
            $scope.sendForm = true;
            //Zamiana wartosci
            if ($scope.Rank == "0") {
                $scope.Rank = 0;
            }
            else if (item.Rank == "1") {
                $scope.Rank = 1;
            }
            else if (item.Rank == "2") {
                $scope.Rank = 2;
            }

            var data = $.param({
                Email: $scope.Email,
                Rank: $scope.Rank,
                Details: $scope.Details,
                Status: 0
                //TODO PASSWORD??
            });
            var config = {
                headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
            };

            if ($scope.sendForm) {
                $scope.message = "Szykujemy nowe biurko...";
                $timeout(function () {
                    $http.post('http://localhost:50000/user/addUser', data, config)
                        .success(function (data, status, headers, config) {
                            $scope.PostDataResponse = data;
                            console.log($scope.PostDataResponse);
                            $scope.CallbackServeraPositive = true;
                            $scope.CallbackServera = true;
                        })
                        .error(function (data, status, header, config) {
                            $scope.ResponseDetails = "Data: " + data +
                                "<hr />status: " + status +
                                "<hr />headers: " + header +
                                "<hr />config: " + config;
                            console.log($scope.ResponseDetails);
                            $scope.CallbackServeraNegative = true;
                            $scope.CallbackServera = true;
                        });
                }, 2500);
            }
        };
    });
    app.controller('ShowUserController', ['$scope', '$routeParams','$http', function ($scope, $routeParams, $http) {

        var WybraneId = $routeParams.id;

        //WYSYLANY ID
        $scope.UserID = WybraneId;


        //ZWROTKA
        $scope.user = [{
            Id: 0,
            Email: 'dev@wp.pl',
            Imie: 'Michal',
            Nazwisko: 'Nazwisko',
            Rank: 0,
            Status: 0,
            Details: 'Jakis Opis'
        }];

        $http.get('http://localhost:50000/user/getUser/' + WybraneId, {
                headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
            }
        ).success(function (data, status, headers, config) {
            $scope.autobus = data;
            console.log("Pobrano usera.")
        }).error(function (data, status, headers, config) {
            console.log("Błąd pobrania usera.")
        });


        angular.forEach($scope.user, function (item) {
            if (item.Rank == 0) {
                item.RankName = "Użytkownik";
            }
            else if (item.Rank == 1) {
                item.RankName = "Kontroler";
            }
            else if (item.Rank == 2) {
                item.RankName = "Administrator";
            }
            if (item.Status == 0) {
                item.StatusName = "Nieaktywny"
            }
            else {
                item.StatusName = "Aktywny"
            }
        });
    }]);
    app.controller('UpdateUserController', function ($scope) {

        //$scope.message = 'This is Add new order screen';
        $scope.userToUpdate = [{}];
        $scope.updateUser = function () {
            angular.forEach($scope.userToUpdate, function (item) {
                angular.forEach($scope.user, function (item2) {
                    if (item.Id == null) {
                        item.Id = item2.Id;
                    }
                    if (item.Email == null) {
                        item.Email = item2.Email;
                    }
                    if (item.Imie == null) {
                        item.Imie = item2.Imie;
                    }
                    if (item.Nazwisko == null) {
                        item.Nazwisko = item2.Nazwisko;
                    }
                    if (item.Rank == null) {
                        item.Rank = item2.Rank;
                    }
                    if (item.Details == null) {
                        item.Details = item2.Details;
                    }
                    item.Status = item2.Status;

                    //Zamiana wartosci

                    if (item.Rank == "0") {
                        item.Rank = 0;
                    }
                    else if (item.Rank == "1") {
                        item.Rank = 1;
                    }
                    else if (item.Rank == "2") {
                        item.Rank = 2;
                    }
                });
            });
            console.log($scope.userToUpdate);


        };

    });
    app.controller('RestoreUserController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    }]);
    app.controller('DeleteUserController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    }]);
    /* Map Controler
     *==========================================================================*/
    app.controller('MapController', function (NgMap) {
        NgMap.getMap().then(function (map) {

        });
    });

    /* Derektywy
     *==========================================================================*/
    var compareTo = function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    };
    app.directive("compareTo", compareTo);
})();

