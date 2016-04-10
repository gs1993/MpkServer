/**
 * Created by msobiecki on 02.04.16.
 */
(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngMap']);

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
            when('/user/show/:id', {
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

        //$scope.message = 'This is Add new order screen';

        $scope.busToCreate=[{}];

        $scope.createBus=function() {
            angular.forEach($scope.busToCreate, function (item) {

                    //Zamiana wartosci

                    if(item.BusType == "1")
                    {
                        item.BusType = 1;
                    }
                    else
                    {
                        item.BusType = 0;
                    }
                    if(item.GotMachine == "1")
                    {
                        item.GotMachine = true;
                    }
                    else
                    {
                        item.GotMachine = false;
                    }
                    //czy przy tworzeniu powinnen być status???
                    item.BusStatus = 0

                });


            console.log($scope.busToCreate);


        };


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

        $scope.busToUpdate=[{}];

        $scope.updateBus=function() {
            angular.forEach($scope.busToUpdate, function (item) {
                angular.forEach($scope.autobus, function (item2) {
                    //Dopisywanie pustych z rodzica

                    if(item.Id==null)
                    {
                        item.Id=item2.Id;
                    }
                    if(item.RegistrationNumber==null)
                    {
                        item.RegistrationNumber=item2.RegistrationNumber;
                    }
                    if(item.BusNumber==null)
                    {
                        item.BusNumber=item2.BusNumber;
                    }

                    item.BusStatus=item2.BusStatus

                    if(item.BusType==null)
                    {
                        item.BusType=item2.BusType;
                    }
                    if(item.GotMachine==null)
                    {
                        item.GotMachine=item2.GotMachine;
                    }

                    item.LastControl=item2.LastControl;

                    //Zamiana wartosci

                    if(item.BusType == "1")
                    {
                        item.BusType = 1;
                    }
                    else
                    {
                        item.BusType = 0;
                    }
                    if(item.GotMachine == 1)
                    {
                        item.GotMachine = true;
                    }
                    else
                    {
                        item.GotMachine = false;
                    }

                });
            });

            console.log($scope.busToUpdate);
            console.log($scope.autobus);

        };

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

        //$scope.message = 'This is Add new order screen';
        $scope.busstopToCreate=[{}];

        $scope.createBusstop=function() {
            angular.forEach($scope.busstopToCreate, function (item) {

                item.Lat=parseFloat(item.Lat);
                item.Lng=parseFloat(item.Lng);
                //Zamiana wartosci
                if(item.GotMachine == 1)
                {
                    item.GotMachine = true;
                }
                else
                {
                    item.GotMachine = false;
                }

                if(item.GotMachine == 1)
                {
                    item.GotMachine = true;
                }
                else
                {
                    item.GotMachine = false;
                }
                if(item.GotKiosk == 1)
                {
                    item.GotKiosk = true;
                }
                else
                {
                    item.GotKiosk = false;
                }

                if(item.BusStopType == "0")
                {
                    item.BusStopType = 0
                }
                else
                {
                    item.BusStopType = 1
                }
                //czy przy tworzeniu powinnen być status???
                item.BusStopStatus = 0


            });


            console.log($scope.busstopToCreate);


        };

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


    app.controller('UpdateBustopController', function($scope) {

        //$scope.message = 'This is Add new order screen';
        $scope.busstopToUpdate=[{}];

        $scope.updateBusstop=function() {
            angular.forEach($scope.busstopToUpdate, function (item) {
                angular.forEach($scope.przystanek, function (item2) {

                    if(item.Id==null)
                    {
                        item.Id=item2.Id;
                    }
                    if(item.Name==null)
                    {
                        item.Name=item2.Name;
                    }
                    if(item.Lat==null)
                    {
                        item.Lat=item2.Lat;
                    }

                    if(item.Lng==null)
                    {
                        item.Lng=item2.Lng;
                    }
                    if(item.LocalizationString==null)
                    {
                        item.LocalizationString=item2.LocalizationString;
                    }
                    if(item.GotMachine==null)
                    {
                        item.GotMachine=item2.GotMachine;
                    }
                    if(item.GotKiosk==null)
                    {
                        item.GotKiosk=item2.GotKiosk;
                    }
                    if(item.BusStopType==null)
                    {
                        item.BusStopType=item2.BusStopType;
                    }
                    item.BusStopStatus=item2.BusStopStatus;
                    item.LastControl=item2.LastControl;

                    //Zamiana wartosci

                    item.Lat=parseFloat(item.Lat);
                    item.Lng=parseFloat(item.Lng);

                    if(item.GotMachine == 1)
                    {
                        item.GotMachine = true;
                    }
                    else
                    {
                        item.GotMachine = false;
                    }

                    if(item.GotMachine == 1)
                    {
                        item.GotMachine = true;
                    }
                    else
                    {
                        item.GotMachine = false;
                    }
                    if(item.GotKiosk == 1)
                    {
                        item.GotKiosk = true;
                    }
                    else
                    {
                        item.GotKiosk = false;
                    }

                    if(item.BusStopType == "0")
                    {
                        item.BusStopType = 0
                    }
                    else
                    {
                        item.BusStopType = 1
                    }
                    //czy przy tworzeniu powinnen być status???


                });
            });


            console.log($scope.busstopToUpdate);


        };

    });



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

        //$scope.message = 'This is Add new order screen';
        $scope.userToCreate=[{}];

        $scope.createUser=function() {
            angular.forEach($scope.userToCreate, function (item) {

                //Zamiana wartosci

                if(item.Rank == "0")
                {
                    item.Rank = 0;
                }
                else if(item.Rank == "1")
                {
                    item.Rank= 1;
                }
                else if(item.Rank == "2")
                {
                    item.Rank = 2;
                }

                //czy przy tworzeniu powinnen być status???
                item.Status = 0


            });


            console.log($scope.userToCreate);


        };

    });


    app.controller('ShowUserController', ['$scope', '$routeParams', function($scope, $routeParams) {

        var WybraneId = $routeParams.id;

        //WYSYLANY ID
        $scope.UserID = WybraneId;


        //ZWROTKA
        $scope.user = [{ Id: 0, Email: 'dev@wp.pl', Imie:'Michal', Nazwisko:'Nazwisko', Rank: 0, Status: 0, Details: 'Jakis Opis'}];
        angular.forEach($scope.user, function (item) {
            if(item.Rank == 0)
            {
                item.RankName = "Użytkownik";
            }
            else if(item.Rank == 1)
            {
                item.RankName = "Kontroler";
            }
            else if(item.Rank == 2)
            {
                item.RankName = "Administrator";
            }
            if(item.Status == 0)
            {
                item.StatusName = "Nieaktywny"
            }
            else
            {
                item.StatusName = "Aktywny"
            }
        });
    }]);

    app.controller('UpdateUserController', function($scope) {

        //$scope.message = 'This is Add new order screen';
        $scope.userToUpdate=[{}];
        $scope.updateUser=function() {
            angular.forEach($scope.userToUpdate, function (item) {
                angular.forEach($scope.user, function (item2) {
                    if(item.Id==null)
                    {
                        item.Id=item2.Id;
                    }
                    if(item.Email==null)
                    {
                        item.Email=item2.Email;
                    }
                    if(item.Imie==null)
                    {
                        item.Imie=item2.Imie;
                    }
                    if(item.Nazwisko==null)
                    {
                        item.Nazwisko=item2.Nazwisko;
                    }
                    if(item.Rank==null)
                    {
                        item.Rank=item2.Rank;
                    }
                    if(item.Details==null)
                    {
                        item.Details=item2.Details;
                    }
                    item.Status=item2.Status;

                    //Zamiana wartosci

                    if(item.Rank == "0")
                    {
                        item.Rank = 0;
                    }
                    else if(item.Rank == "1")
                    {
                        item.Rank= 1;
                    }
                    else if(item.Rank == "2")
                    {
                        item.Rank = 2;
                    }
                });
            });
            console.log($scope.userToUpdate);


        };

    });
    
    app.controller('MapController', function(NgMap) {
        NgMap.getMap().then(function(map) {

        });
    });
})();