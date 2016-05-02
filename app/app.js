/**
 * Created by msobiecki on 02.04.16.
 */
(function () {
  'use strict';
  var app = angular.module('app', ['ngRoute', 'ngMap','wt.responsive', 'ngCookies']).factory('AuthenticationService', AuthenticationService);

  app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
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
      })
        .when('/logout', {
          templateUrl: 'panelLogin.html',
          controller: 'LogoutController'
        })
      //AUTOBUS SCIEZKI
        .when('/bus', {
        templateUrl: 'panelAutobusy.html',
        controller: 'BusController',
        activetab: 'bus'
      }).when('/bus/add', {
        templateUrl: 'panelDodajAutobus.html',
        controller: 'AddBusController'
      }).when('/bus/show/:id', {
        templateUrl: 'panelWyswietlAutobus.html',
        controller: 'ShowBusController'
      }).when('/bus/delete/:id', {
        templateUrl: 'panelAutobusy.html',
        controller: 'DeleteBusController'
      }).when('/bus/restore/:id', {
        templateUrl: 'panelAutobusy.html',
        controller: 'RestoreBusController'
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
      }).when('/busstop/delete/:id', {
        templateUrl: 'panelPrzystanki.html',
        controller: 'DeleteBusstopController'
      }).when('/busstop/restore/:id', {
        templateUrl: 'panelPrzystanki.html',
        controller: 'RestoreBusstopController'
      }).//Trasy SCIEZKI
        when('/track', {
          templateUrl: 'panelTrasy.html',
          controller: 'TrackController'
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
        redirectTo: '/'
      });
    }]);
  app.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Session'] = $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }
      else {
        //HIDE HEADER
        $rootScope.globals.HeaderToHide = true;
        $rootScope.globals.UserIsLogin = false;
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/home', '/forgot', '/info', '/auth', '/logout']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
          $location.path('/');
        }
      });
    }]);
  /* Standardowe Controlery
   *==========================================================================*/
  HomeController.$inject = ['$scope', '$http', '$rootScope', '$timeout'];
  function HomeController($scope, $http, $rootScope, $timeout) {
    if($rootScope.globals.currentUser){
      console.log( $rootScope.globals);
      console.log( $rootScope.globals.currentUser.Email);
      $scope.userName = $rootScope.globals.currentUser.Email;
    }
    else{
      $scope.userName = 'nieznajomy'
    }
  }
  app.controller('HomeController', HomeController);

  app.controller('LogoutController', function ($scope, $http, $cookieStore, $rootScope) {
   $rootScope.globals = {HeaderToHide: true, UserIsLogin: false};
   $cookieStore.remove('globals');
   $http.defaults.headers.common.Authorization = 'Session';
   });
  AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
  function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
    var service = {};

    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(username, password, callback) {
      /* Use this for real authentication
       ----------------------------------------------*/
      $http.post('http://localhost:50000/User/Login', { Email: username, Password: password })
          .success(function (response) {
              $rootScope.authdata = response.Token;
            console.log("Pobranie tokenu");
            console.log($rootScope.authdata);
              callback(response);
          });
    }

    function SetCredentials(username, password) {
      var authdata = $rootScope.authdata;
      console.log("Zmienna Globalna przypisna");
      $rootScope.globals = {
        currentUser: {
          Email: username,
          authdata: authdata
        },
        HeaderToHide: false,
        UserIsLogin: true
      };
      $http.defaults.headers.common['Session'] = '' + authdata; // jshint ignore:line
      $cookieStore.put('globals', $rootScope.globals);
      console.log("Cookies ustawione");
    }

    function ClearCredentials() {
      $rootScope.globals = {HeaderToHide: true, UserIsLogin: false};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = 'Session';
    }
}
  LoginController.$inject = ['$location', 'AuthenticationService', '$scope'];
  function LoginController($location, AuthenticationService, $scope) {
    $scope.sendForm = false;
    console.log("loaded1");
    $scope.Login = function () {
      console.log("loaded2");
      $scope.sendForm = true;
      (function initController() {
        // reset login status
        AuthenticationService.ClearCredentials();
      })();
      var data = JSON.stringify({
        Email: $scope.Email,
        Password: $scope.Password
      });

      if ($scope.sendForm) {
        $scope.message = "Logowanie do systemu...";
        console.log(data);
        AuthenticationService.Login($scope.Email, $scope.Password, function (response) {
          console.log("Sukces pobrania sprawdzenie");
          console.log(response.Result);
          if (response.Result) {
            console.log("Sukces pobrania tokenu do ustawienia zmiennej globalnej");
            AuthenticationService.SetCredentials($scope.Email, $scope.Password);
            $location.path('/');
          }
        });
      }
    }
  }
  app.controller('LoginController', LoginController);
  app.controller('RegisterController', function ($scope, $http, $timeout) {
    $scope.RegisterSteps = {};
    $scope.RegisterSteps.GoToSecondForm = false;
  });
  app.controller('RegisterStepOneController', function ($scope, $http, $timeout) {

    // Pierwszy formularz
    $scope.sendForm = false;

    $scope.Register = function () {
      $scope.sendForm = true;
      var data = JSON.stringify({
        Email: $scope.Email,
        Password: $scope.Password
      });
      if ($scope.sendForm) {
        $scope.message = "Jeszcze chwilka...";
        console.log(data);
        $timeout(function () {
          $http.post('http://localhost:50000/User/SelfRegister', data)
            .success(function (data, status) {
              $scope.CallbackServera = true;
              $scope.PostDataResponse = data;
              console.log($scope.PostDataResponse);
              $scope.messageToken = "Na twój email został wysłany link aktywacyjny...";
              $scope.RegisterSteps.GoToSecondForm = true;
            })
            .error(function (data, status) {
              $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status;
              console.log($scope.ResponseDetails);
              $scope.CallbackServera = true;
              $scope.messageTokenError = "Coś poszło nie tak, spóbuj jeszcze raz.";
            });
        }, 2500);
      }
    };
  });
  app.controller('RegisterStepTwoController', function ($scope, $http, $timeout) {

    // Pierwszy formularz
    $scope.sendForm = false;

    $scope.RegisterToken = function () {
      $scope.sendForm = true;
      var data = JSON.stringify({
        Email: $scope.Email,
        Password: $scope.Password,
        Token: $scope.Token
      });
      if ($scope.sendForm) {
        $scope.message = "Jeszcze chwilka...";
        console.log(data);
        $timeout(function () {
          $http.post('http://localhost:50000/User/ActivateUser', data)
            .success(function (data, status) {
              $scope.CallbackServera = true;
              $scope.PostDataResponse = data;
              console.log($scope.PostDataResponse);
              $scope.messageToken = "Twoje konto zostało aktywowane. Możesz się teraz zalogować.";
            })
            .error(function (data, status) {
              $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status;
              console.log($scope.ResponseDetails);
              $scope.CallbackServera = true;
              $scope.messageTokenError = "Coś poszło nie tak, spóbuj jeszcze raz.";
            });
        }, 2500);
      }
    };
  });

  app.controller('ResetPasswordController', function ($scope) {

    $scope.message = 'This is Add new order screen';

  });

  /* Autobusy Controlery
   *==========================================================================*/
  app.controller('BusController', function ($scope, $http) {


    $http.get('http://localhost:50000/Bus/GetBusList/', {
      //headers: {'Session': ''}
    }).success(function (data, status, headers, config) {
      $scope.autobusy = data;
      console.log("Pobrano liste autobusów.")
      angular.forEach($scope.autobusy, function (autobus) {
        console.log(autobus);
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
    }).error(function (data, status, headers, config) {
      console.log("Błąd pobrania Autobusów.")
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
      var data = JSON.stringify({
        RegistrationNumber: $scope.RegistrationNumber,
        BusNumber: $scope.BusNumber,
        BusType: $scope.BusType,
        GotMachine: $scope.GotMachine,
        BusStatus: 0,
        LastControl: new Date()
      });
      var config = {
        //headers: {'Session': ''}
      };

      if ($scope.sendForm) {
        $scope.message = "Przygotowywanie autobusu do drogi...";
        console.log(data);
        $timeout(function () {
          $http.post('http://localhost:50000/Bus/PostBus', data, config)
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
    $scope.sendForm = false;
    //WYSYLANY ID
    $scope.AutobusID = WybraneId;

    $http.get('http://localhost:50000/Bus/GetBus/' + WybraneId, {
        //headers: {'Session': ''}
      }
    ).success(function (data, status, headers, config) {
      $scope.autobus = data;
      console.log($scope.autobus);
      console.log("Pobrano autobus.");
      if ($scope.autobus.GotMachine == true) {
        $scope.autobus.GotMachineName = "Tak";
        $scope.autobus.GotMachineValue = 1
      }
      else {
        $scope.autobus.GotMachineName = "Nie";
        $scope.autobus.GotMachineValue = 0
      }

      if ($scope.autobus.BusType == 0) {
        $scope.autobus.BusTypeName = "Normalny"
      }
      else {
        $scope.autobus.BusTypeName = "Przegubowy"
      }
      if ($scope.autobus.BusStatus == 0) {
        $scope.autobus.BusStatusName = "Nieaktywny"
      }
      else if ($scope.autobus.BusStatus == 1) {
        $scope.autobus.BusStatusName = "W zajezdni"
      }
      else {
        $scope.autobus.BusStatusName = "W trasie"
      }
    }).error(function (data, status, headers, config) {
      console.log("Błąd pobrania autobusu.")
    });


  }]);
  app.controller('UpdateBusController', ['$scope', '$routeParams', '$http', '$timeout', function ($scope, $routeParams, $http, $timeout) {


    var WybraneId = $routeParams.id;

    $scope.updateBus = function () {
      $scope.sendForm = true;
      if ($scope.BusType == "1") {
        $scope.BusType = 1;
      }
      else if ($scope.BusType == "0") {
        $scope.BusType = 0;
      }

      if ($scope.GotMachine == "1") {
        $scope.GotMachine = true;
      }
      else if ($scope.GotMachine == "0") {
        $scope.GotMachine = false;
      }


      var data = JSON.stringify({
        Id: WybraneId,
        RegistrationNumber: $scope.RegistrationNumber,
        BusNumber: $scope.BusNumber,
        BusType: $scope.BusType,
        GotMachine: $scope.GotMachine,
        BusStatus:  $scope.autobus.BusStatus,
        LastControl: $scope.autobus.LastControl
      });
      var config = {
        //headers: {'Session': ''}
      };

      if ($scope.sendForm) {
        $scope.message = "Trwa Aktualizacja Autobusu...";
        console.log(data);
        $timeout(function () {
          $http.put('http://localhost:50000/Bus/PutBus', data, config)
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


  }]);
  app.controller('RestoreBusController', ['$scope', '$routeParams', '$http', '$timeout', function ($scope, $routeParams, $http, $timeout) {
    var WybraneId = $routeParams.id;
    $scope.sendForm = true;
    var config = {
      //headers: {'Session': ''}
    };

    if ($scope.sendForm) {
      $scope.message = "Przygotowywanie autobusu...";
      $timeout(function () {

        $http.put('http://localhost:50000/Bus/PutRestore/' + WybraneId, config)
          .success(function (status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.komunikat = "Autobus został aktywowany pomyślnie!"
          })
          .error(function (status, header, config) {
            $scope.ResponseDetails =
              "<hr />status: " + status +
              "<hr />headers: " + header +
              "<hr />config: " + config;
            $scope.CallbackServera = true;
            $scope.CallbackServeraNegative = true;
          });

      }, 2500);
    }
  }]);
  app.controller('DeleteBusController', ['$scope', '$routeParams', '$http', '$timeout', function ($scope, $routeParams, $http, $timeout) {
    var WybraneId = $routeParams.id;

    $scope.sendForm = true;
    var config = {
      //headers: {'Session': ''}
    };

    if ($scope.sendForm) {
      $scope.message = "Dezaktywowanie autobusu...";

      $timeout(function () {
        $http.delete('http://localhost:50000/Bus/delete/' + WybraneId, config)
          .success(function (status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.komunikat = "Autobus został dezaktywowany pomyślnie!"
          })
          .error(function (status, header, config) {
            $scope.ResponseDetails =
              "<hr />status: " + status +
              "<hr />headers: " + header +
              "<hr />config: " + config;
            console.log($scope.ResponseDetails);
            $scope.CallbackServera = true;
            $scope.CallbackServeraNegative = true;
          });

      }, 2500);
    }
  }]);

  /* Przystanki Controlery
   *==========================================================================*/
  app.controller('BusstopController', function ($scope, $http) {


    $http.get('http://localhost:50000/Busstop/GetBusstopList/', {
      //headers: {'Session': ''}
    }).success(function (data, status, headers, config) {
      $scope.przystanki = data;
      console.log($scope.przystanki);
      console.log("Pobrano liste przystanków.");
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
    }).error(function (data, status, headers, config) {
      console.log("Błąd pobrania przystanków.")
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

      var data = JSON.stringify({
        Name: $scope.Name,
        Lat: $scope.Lat,
        Lng: $scope.Lng,
        LocalizationString: $scope.LocalizationString,
        GotMachine: $scope.GotMachine,
        GotKiosk: $scope.GotKiosk,
        BusStopType: $scope.BusStopType,
        BusStopStatus: 0,
        LastControl: new Date()
      });
      var config = {
        //headers: {'Session': ''}
      };

      if ($scope.sendForm) {
        $scope.message = "Przygotowywanie przystanku...";
        $timeout(function () {
          $http.post('http://localhost:50000/Busstop/PostBusstop', data, config)
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
    /*$scope.autobus = [{
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
     }];*/

    $http.get('http://localhost:50000/Busstop/GetBusstop/' + WybraneId, {
        //headers: {'Session': ''}
      }
    ).success(function (data, status, headers, config) {
      $scope.autobus = data;
      console.log("Pobrano przystanek.")
      if ($scope.autobus.GotMachine == true) {
        $scope.autobus.GotMachineName = "Tak";
        $scope.autobus.GotMachineValue = 1
      }
      else {
        $scope.autobus.GotMachineName = "Nie";
        $scope.autobus.GotMachineValue = 0
      }
      if ($scope.autobus.GotKiosk == true) {
        $scope.autobus.GotKioskName = "Tak";
        $scope.autobus.GotKioskValue = 1
      }
      else {
        $scope.autobus.GotKioskName = "Nie";
        $scope.autobus.GotKioskValue = 0
      }

      if ($scope.autobus.BusStopType == 0) {
        $scope.autobus.BusStopTypeName = "Normalny"
      }
      else {
        $scope.autobus.BusStopTypeName = "Zabudowany"
      }
      if ($scope.autobus.BusStopStatus == 0) {
        $scope.autobus.BusStopStatusName = "Nieaktywny"
      }
      else {
        $scope.autobus.BusStopStatusName = "Aktywny"
      }
    }).error(function (data, status, headers, config) {
      console.log("Błąd pobrania przystanku.")
    });
  }]);
  app.controller('UpdateBustopController', ['$scope', '$routeParams', '$http', '$timeout', function ($scope, $routeParams, $http, $timeout) {

    $scope.sendForm = false;
    var WybraneId = $routeParams.id;

    $scope.updateBusstop = function () {
      $scope.sendForm = true;






      ///////////////////////////////////////////////

      if ($scope.Name == null || $scope.Name == "") {
        $scope.Name = $scope.autobus.Name;
      }


      if ($scope.LocalizationString == null || $scope.LocalizationString == "") {
        $scope.LocalizationString = $scope.autobus.LocalizationString;
      }

      if ($scope.GotMachine == 1) {
        $scope.GotMachine = true;
      }

      else if ($scope.GotMachine == 0) {
        $scope.GotMachine = false;
      }

      if ($scope.Lat != null) {
        $scope.Lat = parseFloat($scope.Lat);
      }

      else if ($scope.Lng != null) {
        $scope.Lng = parseFloat($scope.Lng);
      }

      if ($scope.GotKiosk == 1) {
        $scope.GotKiosk = true;
      }
      else if ($scope.GotKiosk == 0) {
        $scope.GotKiosk = false;
      }

      if ($scope.BusStopType == "0") {
        $scope.BusStopType = 0
      }
      else if ($scope.BusStopType == "1") {
        $scope.BusStopType = 1
      }



      if ($scope.Lat == null || $scope.Lat == "") {
        $scope.Lat = $scope.autobus.Lat;
      }
      if ($scope.Lng == null || $scope.Lng == "") {
        $scope.Lng = $scope.autobus.Lng;
      }
      if ($scope.GotMachine == null || $scope.GotMachine == "") {
        $scope.GotMachine = $scope.autobus.GotMachine;
      }
      if ($scope.GotKiosk == null || $scope.GotKiosk == "") {
        $scope.GotKiosk = $scope.autobus.GotKiosk;
      }
      if ($scope.BusStopType == null || $scope.BusStopType == "") {
        $scope.BusStopType = $scope.autobus.BusStopType;
      }


      var data = JSON.stringify({
        Id: WybraneId,
        Name: $scope.Name,
        Lat: $scope.Lat,
        Lng: $scope.Lng,
        LocalizationString: $scope.LocalizationString,
        GotMachine: $scope.GotMachine,
        GotKiosk: $scope.GotKiosk,
        BusStopType: $scope.BusStopType,
        BusStopStatus: $scope.autobus.BusStopStatus,
        LastControl: $scope.autobus.LastControl
      });
      var config = {
        //headers: {'Session': ''}
      };

      if ($scope.sendForm) {
        $scope.message = "Trwa Aktualizacja Autobusu...";
        console.log(data);
        $timeout(function () {
          $http.put('http://localhost:50000/BusStop/PutBusStop', data, config)
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


  }]);
  app.controller('RestoreBusstopController', ['$scope', '$routeParams', '$http', '$timeout', function ($scope, $routeParams, $http, $timeout) {

    var WybraneId = $routeParams.id;
    $scope.sendForm = true;
    var config = {
      //headers: {'Session': ''}
    };

    if ($scope.sendForm) {
      $scope.message = "Przygotowywanie przystanku...";
      $timeout(function () {

        $http.put('http://localhost:50000/BusStop/PutRestore/' + WybraneId, config)
          .success(function (status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.komunikat = "Przystanek został aktywowany pomyślnie!"
          })
          .error(function (status, header, config) {
            $scope.ResponseDetails =
              "<hr />status: " + status +
              "<hr />headers: " + header +
              "<hr />config: " + config;
            $scope.CallbackServera = true;
            $scope.CallbackServeraNegative = true;
          });
      }, 2500);

    }


  }]);
  app.controller('DeleteBusstopController', ['$scope', '$routeParams', '$http', '$timeout', function ($scope, $routeParams, $http, $timeout) {

    var WybraneId = $routeParams.id;

    $scope.sendForm = true;
    var config = {
      //headers: {'Session': ''}
    };

    if ($scope.sendForm) {
      $scope.message = "Dezaktywowanie przystanku...";
      $timeout(function () {

        $http.delete('http://localhost:50000/BusStop/DeleteBusStop/' + WybraneId, config)
          .success(function (status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.komunikat = "Przystanek został dezaktywowany pomyślnie!"
          })
          .error(function (status, header, config) {
            $scope.ResponseDetails =
              "<hr />status: " + status +
              "<hr />headers: " + header +
              "<hr />config: " + config;
            console.log($scope.ResponseDetails);
            $scope.CallbackServera = true;
            $scope.CallbackServeraNegative = true;
          });
      }, 2500);

    }


  }]);
  /* Trasy Controlery
   *==========================================================================*/
  app.controller('TrackController', function ($scope, $http) {
  });

  /* Użytkownicy Controlery
   *==========================================================================*/
  app.controller('UserController', function ($scope, $http) {

    /*$scope.users = [
     {Id: 0, Email: 'dev@wp.pl', Rank: 0, Status: 0, Details: "Opis...?"},
     {Id: 1, Email: 'dev2@wp.pl', Rank: 1, Status: 1, Details: "Opis...?"},
     {Id: 1, Email: 'dev2@wp.pl', Rank: 1, Status: 1, Details: "Opis...?"},
     {Id: 2, Email: 'dev3@wp.pl', Rank: 2, Status: 0, Details: "Opis...?"}
     ];*/

    $http.get('http://localhost:50000/user/GetUserList', {
      //headers: {'Session': ''}
    }).success(function (data, status, headers, config) {
      $scope.users = data;
      console.log("Pobrano liste userów.");
      console.log(data);
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
        if (user.Activated == false) {
          user.StatusName = "Nieaktywny"
        }
        else {
          user.StatusName = "Aktywny"
        }
      });
    }).error(function (data, status, headers, config) {
      console.log("Błąd pobrania userów.")
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

      var data = JSON.stringify({
        Email: $scope.Email,
        Rank: $scope.Rank,
        Details: $scope.Details,
        Status: 0,
        Password: $scope.Password
      });
      var config = {
        //headers: {'Session': ''}
      };

      if ($scope.sendForm) {
        $scope.message = "Szykujemy nowe biurko...";
        $timeout(function () {
          $http.post('http://localhost:50000/user/SelfRegister', data, config)
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
  app.controller('ShowUserController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    var WybraneId = $routeParams.id;

    //WYSYLANY ID
    $scope.UserID = WybraneId;


    /*//ZWROTKA
     $scope.user = [{
     Id: 0,
     Email: 'dev@wp.pl',
     Imie: 'Michal',
     Nazwisko: 'Nazwisko',
     Rank: 0,
     Status: 0,
     Details: 'Jakis Opis'
     }];*/

    $http.get('http://localhost:50000/user/getUser/' + WybraneId, {
        //headers: {'Session': ''}
      }
    ).success(function (data, status, headers, config) {
      $scope.user = data;
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

    ////$scope.message = 'This is Add new order screen';
    //$scope.userToUpdate = [{}];
    //$scope.updateUser = function () {
    //    angular.forEach($scope.userToUpdate, function (item) {
    //        angular.forEach($scope.user, function (item2) {
    //            if (item.Id == null) {
    //                item.Id = item2.Id;
    //            }
    //            if (item.Email == null) {
    //                item.Email = item2.Email;
    //            }
    //            if (item.Imie == null) {
    //                item.Imie = item2.Imie;
    //            }
    //            if (item.Nazwisko == null) {
    //                item.Nazwisko = item2.Nazwisko;
    //            }
    //            if (item.Rank == null) {
    //                item.Rank = item2.Rank;
    //            }
    //            if (item.Details == null) {
    //                item.Details = item2.Details;
    //            }
    //            item.Status = item2.Status;
    //
    //            //Zamiana wartosci
    //
    //            if (item.Rank == "0") {
    //                item.Rank = 0;
    //            }
    //            else if (item.Rank == "1") {
    //                item.Rank = 1;
    //            }
    //            else if (item.Rank == "2") {
    //                item.Rank = 2;
    //            }
    //        });
    //    });
    //    console.log($scope.userToUpdate);


    // };

  });
  app.controller('RestoreUserController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

  }]);
  app.controller('DeleteUserController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    // var WybraneId = $routeParams.id;


  }]);
  /* Map Controler
   *==========================================================================*/
  app.controller('MapController', function (NgMap,$scope,$http, $timeout) {
    var wrapper = $('.wrapper');

    $scope.lat = 53.77842200000001;
    $scope.lng = 20.48011930000007;

    $scope.setPostitionBusstop = function (id) {
      $http.get('http://localhost:50000/Busstop/GetBusstop/' + id
      ).success(function (data, status, headers, config) {
        $scope.busstop = data;
        $scope.lat=$scope.busstop.Lat;
        $scope.lng=$scope.busstop.Lng;
      }).error(function (data, status, headers, config) {
        console.log("Błąd pobrania przystanku.")
      });
    };

    ///////////////////////////////////////////////////////////////

    NgMap.getMap().then(function(map) {
      $scope.map = map;
    });

    $scope.busstopMarker = [];
    $scope.bussMarker = [];


    $scope.deleteMarkers = function() {
      $scope.busstopMarker = [];
      $scope.bussMarker = [];
    };

    $scope.showBusstop = function(event, busstop) {
      $scope.selectedBusstop = busstop;
      $scope.map.showInfoWindow('myInfoWindow', this);
    };


    $scope.showBusstopMarkers = function() {

      $scope.busstopMarkers=[];

      $http.get('http://localhost:50000/Busstop/GetBusstopList/'
      ).success(function (data, status, headers, config) {
        $scope.busstop = data;
        console.log($scope.przystanki);
        console.log("Pobrano liste przystanków.");
        angular.forEach($scope.busstop, function (przystanek) {
          if (przystanek.GotMachine == true) {
            przystanek.GotMachineName = "Tak";
          }
          else {
            przystanek.GotMachineName = "Nie";
          }
          if (przystanek.GotKiosk == true) {
            przystanek.GotKioskName = "Tak";
          }
          else {
            przystanek.GotKioskName = "Nie";
          }
          if (przystanek.BusStopType == 0) {
            przystanek.BusStopTypeName = "Normalny"
          }
          else {
            przystanek.BusStopTypeName = "Zabudowany"
          }
          if(przystanek.BusStopStatus==1)
          {
            $scope.busstopMarkers.push({
              Id: przystanek.Id,
              Name: przystanek.Name,
              LocalizationString: przystanek.LocalizationString,
              GotMachineName:  przystanek.GotMachineName,
              GotKioskName: przystanek.GotKioskName,
              BusStopTypeName: przystanek.BusStopTypeName,
              Position: [przystanek.Lat, przystanek.Lng]
            });
          }




        });
      }).error(function (data, status, headers, config) {
        console.log("Błąd pobrania przystanków.")
      });

      $scope.busstopMarker=$scope.busstopMarkers;

    };

    ////////////////////////////////////////////////////////////////////////

    $scope.initMarkers=function () {
      //$scope.deleteMarkers();
      $scope.showBusstopMarkers();
    };

    // $scope.initBuss=function () {
    //   $scope.deleteMarkers();
    //   //$scope.showBussMarkers();
    // };



  });









  /* Derektywy
   *==========================================================================*/
  var compareTo = function () {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function (scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function () {
          ngModel.$validate();
        });
      }
    };
  };
  app.directive("compareTo", compareTo);
})();

