/**
 * Created by msobiecki on 02.04.16.
 */
(function () {
  'use strict';
  var app = angular.module('app', ['ngRoute', 'ngMap', 'wt.responsive', 'ngCookies', 'ngWebSocket'])
    .factory('AuthenticationService', AuthenticationService);
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
      }).when('/track/add', {
        templateUrl: 'panelDodajTrase.html',
        controller: 'AddTrackController'
      }).when('/track/show/:id', {
        templateUrl: 'panelWyswietlTrase.html',
        controller: 'ShowTrackController'
      })
        .when('/course/show/:id', {
          templateUrl: 'panelWyswietlKurs.html',
          controller: 'ShowCourseController'
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
      $rootScope.IP = '192.168.1.4';
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
    if ($rootScope.globals.currentUser) {
      //console.log($rootScope.globals);
      //console.log($rootScope.globals.currentUser.Email);
      $scope.userName = $rootScope.globals.currentUser.Email;
    }
    else {
      $scope.userName = 'nieznajomy'
    }
  }

  app.controller('HomeController', HomeController);


  app.controller('LogoutController', function ($scope, $http, $cookieStore, $rootScope) {
    $rootScope.globals = {HeaderToHide: true, UserIsLogin: false};
    $cookieStore.remove('globals');
    $http.defaults.headers.common.Authorization = 'Session';

    $scope.deleteMarkers();
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
      $http.post('http://' + $rootScope.IP + ':50000/User/Login', {Email: username, Password: password})
        .success(function (response) {
          $rootScope.authdata = response.Token;
          //console.log("Pobranie tokenu");
          //console.log($rootScope.authdata);
          callback(response);
        })
        .error(function (data, status) {
          console.log("[Error] Blad polaczenia z serwerem logowania.");
        });
    }

    function SetCredentials(username, password) {
      var authdata = $rootScope.authdata;
      //console.log("Zmienna Globalna przypisna");
      $rootScope.globals = {
        currentUser: {
          Email: username,
          Password: password,
          authdata: authdata
        },
        HeaderToHide: false,
        UserIsLogin: true
      };
      $http.defaults.headers.common['Session'] = '' + authdata; // jshint ignore:line
      $cookieStore.put('globals', $rootScope.globals);
      //console.log("Cookies ustawione");
    }

    function ClearCredentials() {
      $rootScope.globals = {HeaderToHide: true, UserIsLogin: false};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = 'Session';
    }
  }


  LoginController.$inject = ['$location', 'AuthenticationService', '$scope', '$rootScope'];
  function LoginController($location, AuthenticationService, $scope, $rootScope) {
    $scope.sendForm = false;
    $scope.Login = function () {
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
        //console.log("[Info] Inicjacja logowania. Dane do logowania:")
        //console.log(data);
        AuthenticationService.Login($scope.Email, $scope.Password, function (response) {
          //console.log("[Sukces] Logowanie na serwerze ustanowione!");
          $rootScope.Service.sendAuth($scope.Email, $scope.Password)

          if (response.Result) {
            //console.log("Sukces pobrania tokenu do ustawienia zmiennej globalnej");
            AuthenticationService.SetCredentials($scope.Email, $scope.Password);
            $location.path('/');

            $scope.initMarkers();
          }
          else {
            $scope.KomunikatVal = true
            $scope.Komunikat = "Wprowadzone dane sa nie poprawne!"
          }
        });
      }
    }
  }

  app.controller('LoginController', LoginController);


  app.controller('RegisterController', function ($scope, $http, $timeout, $rootScope) {
    $scope.RegisterSteps = {};
    $scope.RegisterSteps.GoToSecondForm = false;
  });


  app.controller('RegisterStepOneController', function ($scope, $http, $timeout, $rootScope) {

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
        //console.log('[Info] Inicjowanie rejestracji. Podane dane to:');
        //console.log(data);
        $timeout(function () {
          $http.post('http://' + $rootScope.IP + ':50000/User/SelfRegister', data)
            .success(function (data, status) {
              $scope.CallbackServera = true;
              $scope.PostDataResponse = data;
              //console.log($scope.PostDataResponse);
              $scope.messageToken = "Na twój email został wysłany link aktywacyjny...";
              $scope.RegisterSteps.GoToSecondForm = true;
            })
            .error(function (data, status) {
              $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status;
              //console.log($scope.ResponseDetails);
              $scope.CallbackServera = true;
              $scope.messageTokenError = "Coś poszło nie tak, spóbuj jeszcze raz.";
            });
        }, 2500);
      }
    };
  });


  app.controller('RegisterStepTwoController', function ($scope, $http, $timeout, $rootScope) {
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
        //console.log(data);
        $timeout(function () {
          $http.post('http://' + $rootScope.IP + ':50000/User/ActivateUser', data)
            .success(function (data, status) {
              $scope.CallbackServera = true;
              $scope.PostDataResponse = data;
              //console.log($scope.PostDataResponse);
              $scope.messageToken = "Twoje konto zostało aktywowane. Możesz się teraz zalogować.";
            })
            .error(function (data, status) {
              $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status;
              //console.log($scope.ResponseDetails);
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
  app.controller('BusController', function ($scope, $http, $rootScope) {


    $http.get('http://' + $rootScope.IP + ':50000/Bus/GetBusList/', {
      //headers: {'Session': ''}
    }).success(function (data, status, headers, config) {
      $scope.autobusy = data;
      //console.log("Pobrano liste autobusów.")
      angular.forEach($scope.autobusy, function (autobus) {
        //console.log(autobus);
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
      //console.log("Błąd pobrania Autobusów.")
    });

  });
  app.controller('AddBusController', function ($scope, $http, $timeout, $rootScope) {
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
        //console.log(data);
        $timeout(function () {
          $http.post('http://' + $rootScope.IP + ':50000/Bus/PostBus', data, config)
            .success(function (data, status, headers, config) {
              $scope.CallbackServera = true;
              $scope.CallbackServeraPositive = true;
              $scope.PostDataResponse = data;
              //console.log($scope.PostDataResponse);

              $scope.initMarkers();

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
  app.controller('ShowBusController', ['$scope', '$routeParams', '$http', '$rootScope', function ($scope, $routeParams, $http, $rootScope) {


    var WybraneId = $routeParams.id;
    $scope.sendForm = false;
    //WYSYLANY ID
    $scope.AutobusID = WybraneId;

    $http.get('http://' + $rootScope.IP + ':50000/Bus/GetBus/' + WybraneId, {
        //headers: {'Session': ''}
      }
    ).success(function (data, status, headers, config) {
      $scope.autobus = data;
      //console.log($scope.autobus);
      //console.log("Pobrano autobus.");

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
  app.controller('UpdateBusController', ['$scope', '$routeParams', '$http', '$rootScope', '$timeout', function ($scope, $routeParams, $http, $rootScope, $timeout) {


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
        BusStatus: $scope.autobus.BusStatus,
        LastControl: $scope.autobus.LastControl
      });
      var config = {
        //headers: {'Session': ''}
      };

      if ($scope.sendForm) {
        $scope.message = "Trwa Aktualizacja Autobusu...";
        //console.log(data);
        $timeout(function () {
          $http.put('http://' + $rootScope.IP + ':50000/Bus/PutBus', data, config)
            .success(function (data, status, headers, config) {
              $scope.CallbackServera = true;
              $scope.CallbackServeraPositive = true;
              $scope.PostDataResponse = data;
              console.log($scope.PostDataResponse);

              $scope.initMarkers();
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
  app.controller('RestoreBusController', ['$scope', '$routeParams', '$http', '$rootScope', '$timeout', function ($scope, $routeParams, $http, $rootScope, $timeout) {
    var WybraneId = $routeParams.id;
    $scope.sendForm = true;
    var config = {
      //headers: {'Session': ''}
    };

    if ($scope.sendForm) {
      $scope.message = "Przygotowywanie autobusu...";
      $timeout(function () {

        $http.put('http://' + $rootScope.IP + ':50000/Bus/PutRestore/' + WybraneId, config)
          .success(function (status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.komunikat = "Autobus został aktywowany pomyślnie!"

            $scope.initMarkers();
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
  app.controller('DeleteBusController', ['$scope', '$routeParams', '$http', '$rootScope', '$timeout', function ($scope, $routeParams, $http, $rootScope, $timeout) {
    var WybraneId = $routeParams.id;

    $scope.sendForm = true;
    var config = {
      //headers: {'Session': ''}
    };

    if ($scope.sendForm) {
      $scope.message = "Dezaktywowanie autobusu...";

      $timeout(function () {
        $http.delete('http://' + $rootScope.IP + ':50000/Bus/delete/' + WybraneId, config)
          .success(function (status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.komunikat = "Autobus został dezaktywowany pomyślnie!"

            $scope.initMarkers();
          })
          .error(function (status, header, config) {
            $scope.ResponseDetails =
              "<hr />status: " + status +
              "<hr />headers: " + header +
              "<hr />config: " + config;
            console.log($scope.ResponseDetails);
            $scope.CallbackServera = true;
            $scope.CallbackServeraNegative = true;

            $scope.initMarkers();
          });

      }, 2500);
    }
  }]);

  /* Przystanki Controlery
   *==========================================================================*/
  app.controller('BusstopController', function ($scope, $http, $rootScope) {
    $http.get('http://' + $rootScope.IP + ':50000/Busstop/GetBusstopList/', {
      //headers: {'Session': ''}
    }).success(function (data, status, headers, config) {
      $scope.przystanki = data;
      //console.log("Pobrano liste przystanków.");
      //console.log($scope.przystanki);
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
  app.controller('AddBusstopController', function ($scope, $http, $timeout, $rootScope) {
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
          $http.post('http://' + $rootScope.IP + ':50000/Busstop/PostBusstop', data, config)
            .success(function (data, status, headers, config) {
              $scope.PostDataResponse = data;
              //console.log($scope.PostDataResponse);
              $scope.CallbackServeraPositive = true;
              $scope.CallbackServera = true;

              $scope.initMarkers();
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
  app.controller('ShowBusstopController', ['$scope', '$routeParams', '$http', '$rootScope', function ($scope, $routeParams, $http, $rootScope) {

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

    $http.get('http://' + $rootScope.IP + ':50000/Busstop/GetBusstop/' + WybraneId, {
        //headers: {'Session': ''}
      }
    ).success(function (data, status, headers, config) {
      $scope.autobus = data;
      //console.log("Pobrano przystanek.")
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
  app.controller('UpdateBustopController', ['$scope', '$routeParams', '$http', '$rootScope', '$timeout', function ($scope, $routeParams, $http, $rootScope, $timeout) {

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
        //console.log(data);
        $timeout(function () {
          $http.put('http://' + $rootScope.IP + ':50000/BusStop/PutBusStop', data, config)
            .success(function (data, status, headers, config) {
              $scope.CallbackServera = true;
              $scope.CallbackServeraPositive = true;
              $scope.PostDataResponse = data;
              //console.log($scope.PostDataResponse);

              $scope.initMarkers();
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
  app.controller('RestoreBusstopController', ['$scope', '$routeParams', '$http', '$rootScope', '$timeout', function ($scope, $routeParams, $http, $rootScope, $timeout) {

    var WybraneId = $routeParams.id;
    $scope.sendForm = true;
    var config = {
      //headers: {'Session': ''}
    };

    if ($scope.sendForm) {
      $scope.message = "Przygotowywanie przystanku...";
      $timeout(function () {

        $http.put('http://' + $rootScope.IP + ':50000/BusStop/PutRestore/' + WybraneId, config)
          .success(function (status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.komunikat = "Przystanek został aktywowany pomyślnie!"

            $scope.initMarkers();
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
  app.controller('DeleteBusstopController', ['$scope', '$routeParams', '$http', '$rootScope', '$timeout', function ($scope, $routeParams, $http, $rootScope, $timeout) {

    var WybraneId = $routeParams.id;

    $scope.sendForm = true;
    var config = {
      //headers: {'Session': ''}
    };

    if ($scope.sendForm) {
      $scope.message = "Dezaktywowanie przystanku...";
      $timeout(function () {

        $http.delete('http://' + $rootScope.IP + ':50000/BusStop/DeleteBusStop/' + WybraneId, config)
          .success(function (status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.komunikat = "Przystanek został dezaktywowany pomyślnie!"

            $scope.initMarkers();
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
  app.controller('TrackController', function ($scope, $http, $rootScope) {


    $http.get('http://' + $rootScope.IP + ':50000/Track/GetList', {
      //headers: {'Session': ''}
    }).success(function (data, status, headers, config) {
      $scope.tracks = data;
      //console.log("Pobrano liste tras.");
      //console.log(data);
      angular.forEach($scope.tracks, function (track) {
        if (track.IsArchive == true) {
          track.StatusName = "Nieaktywny";
          track.StatusValue = 0;
        }
        else {
          track.StatusName = "Aktywny";
          track.StatusValue = 1;
        }
      });
    }).error(function (data, status, headers, config) {
      console.log("Błąd pobrania tras.")
    });
  });
  app.controller('AddTrackController', function ($scope, $http, $timeout, $rootScope) {
    $scope.DodanoTrase = false;

    $http.get('http://' + $rootScope.IP + ':50000/Busstop/GetBusstopList/', {
      //headers: {'Session': ''}
    }).success(function (data, status, headers, config) {
      $scope.przystanki = data;
      //console.log($scope.przystanki);
      //console.log("Pobrano liste przystanków.");
      $scope.przystankiDoTras = $scope.przystanki;
      //console.log("Clonowanie przystankow");
      //console.log($scope.przystankiDoTras);
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
    $scope.count = 0;
    $scope.przystankiWybrane = [];
    $scope.saPrzystanki = false;
    $scope.usunieciePrzystanku = function (index) {
      $scope.przystankiWybrane.splice(-1, 1);
      if ($scope.przystankiWybrane.length <= 0) {
        $scope.saPrzystanki = false;
      }
    };
    $scope.zapiszTrase = function () {
      console.log("Zapisywanie przystankeeeee");
      $scope.tablicaWybranychPrzystankow = [];
      console.log("Wybrane Przystanki:");
      console.log($scope.przystankiWybrane.length);
      console.log("Wybrane Przystanki END");
      if ($scope.przystankiWybrane.length > 0) {
        for (var i = 0; i < $scope.przystankiWybrane.length; i++) {
          $scope.tablicaWybranychPrzystankow.push($scope.przystankiWybrane[i].Id)
        }
        var data = JSON.stringify({
          Id: 1,
          BusStops: $scope.tablicaWybranychPrzystankow,
          LineNumber: $scope.LineNumber,
          IsArchive: true
        });
        var config = {
          //headers: {'Session': ''}
        };
        $http.post('http://' + $rootScope.IP + ':50000/Track/Create', data, config)
          .success(function (data, status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.PostDataResponse = data;
            console.log($scope.PostDataResponse);
            $scope.DodanoTrase = true;

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
      }
      else {
        $scope.BrakPrzystankow = true
      }
    }

    $scope.wybraniePrzystanku = function (index) {
      $scope.BrakPrzystankow = false
      $http.get('http://' + $rootScope.IP + ':50000/Busstop/GetBusstop/' + index, {
          //headers: {'Session': ''}
        }
      ).success(function (data, status, headers, config) {
        $scope.autobus = data;
        //console.log("Pobrano przystanek.");
        //console.log($scope.autobus);
        var przystanekDodany = false;
        for (var i = 0; i < $scope.przystankiWybrane.length; i++) {
          if ($scope.autobus.Id == $scope.przystankiWybrane[i].Id) {
            przystanekDodany = true;
          }
        }
        if (przystanekDodany == false) {
          $scope.count++;
          $scope.przystankiWybrane.push($scope.autobus);
          console.log($scope.przystankiDoTras);
          $scope.saPrzystanki = true;
        }
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
    }
  });
  app.controller('ShowTrackController', ['$scope', '$routeParams', '$http', '$rootScope', '$timeout', function ($scope, $routeParams, $http, $rootScope, $timeout) {

    var WybraneId = $routeParams.id;
    $scope.sendForm = false;
    //WYSYLANY ID
    $scope.TrackID = WybraneId;

    $http.get('http://' + $rootScope.IP + ':50000/Track/Get/' + WybraneId, {
        //headers: {'Session': ''}
      }
    ).success(function (data, status, headers, config) {
      $scope.track = data;
      //console.log($scope.track);
      //console.log("Pobrano trase.");
      $scope.przystankiTrasy = $scope.track.BusStops;
      //console.log("Przystanki trasy:")
      //console.log($scope.przystankiTrasy)
      if ($scope.track.IsArchive == 1) {
        $scope.track.IsArchiveName = "Nieaktywna";
        $scope.track.IsArchiveVar = true
      }
      else {
        $scope.track.IsArchiveName = "Aktywna";
        $scope.track.IsArchiveVar = false
      }
      $scope.initTrack($scope.track);
    }).error(function (data, status, headers, config) {
      console.log("Błąd pobrania trasy.")
    });

    $http.get('http://' + $rootScope.IP + ':50000/Course/GetList', {
        //headers: {'Session': ''}
      }
    ).success(function (data, status, headers, config) {
      $scope.kursy = data;
      $scope.kursyPoprawne = [];
      //console.log("[Info] Pobrano kursy");
      //console.log($scope.kursy);
      angular.forEach($scope.kursy, function (kurs) {
        if (kurs.Track.Id == WybraneId) {
          if (kurs.Ended == false) {
            kurs.EndedName = "W trakcie"

          }
          else {
            kurs.EndedName = "Zakonczony"
          }
          $scope.kursyPoprawne.push(kurs)
        }
      });
      //console.log("[Info] Kursy poprawne wygenerowane.")
      //console.log($scope.kursyPoprawne)
      $scope.SubskrypcjaAutobow = function () {
        $scope.SubskrypcjaKlik = true
        console.log("[Info] Inicjowanie subskrypcji autobusu")
        $rootScope.Service.sendAuth($rootScope.globals.Email, $rootScope.globals.Password);
        $rootScope.Service.sendSubscribeAll();
      }
      $scope.SubskrypcjaAutobow();

    }).error(function (data, status, headers, config) {
      console.log("Błąd pobrania kursów.")
    });
    $rootScope.KursyTrasyWebSocketActive = true
    $rootScope.KursWebSocketReloadActive = false
    $rootScope.KursyTrasyWebSocket = function () {
      $http.get('http://' + $rootScope.IP + ':50000/Course/GetList', {
          //headers: {'Session': ''}
        }
      ).success(function (data, status, headers, config) {
        $scope.kursy = data;
        $scope.kursyPoprawne = [];
        //console.log("[Info] Pobrano kursy");
        //console.log($scope.kursy);
        angular.forEach($scope.kursy, function (kurs) {
          if (kurs.Track.Id == WybraneId) {
            if (kurs.Ended == false) {
              kurs.EndedName = "W trakcie"

            }
            else {
              kurs.EndedName = "Zakonczony"
            }
            $scope.kursyPoprawne.push(kurs)
          }
        });
        //console.log("[Info] Kursy poprawne wygenerowane.")
        //console.log($scope.kursyPoprawne)

      }).error(function (data, status, headers, config) {
        console.log("Błąd pobrania kursów.")
      });
    }

    $scope.UsuniecieTrasy = function (index) {
      var WybraneId = index;
      console.log("WybraneID");
      console.log(WybraneId);
      $scope.sendForm = true;
      var config = {
        //headers: {'Session': ''}
      };

      if ($scope.sendForm) {
        $scope.message = "Dezaktywowanie trasy...";

        $http.delete('http://' + $rootScope.IP + ':50000/Track/Delete/' + WybraneId, config)
          .success(function (status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.komunikat = "Trasa została dezaktywowana pomyślnie!";
            $scope.usuniecie = true
            $scope.dodanie = false
            $scope.initMarkers();
          })
          .error(function (status, header, config) {
            $scope.ResponseDetails =
              "<hr />status: " + status +
              "<hr />headers: " + header +
              "<hr />config: " + config;
            console.log($scope.ResponseDetails);
            $scope.CallbackServera = true;
            $scope.CallbackServeraNegative = true;
            $scope.komunikat = "Coś poszło nie tak!";
          });

      }
    }
    $scope.AktywujTrasy = function (index) {
      var WybraneId = index;
      console.log("WybraneID");
      console.log(WybraneId);
      $scope.sendForm = true;
      var config = {
        //headers: {'Session': ''}
      };

      if ($scope.sendForm) {
        $scope.message = "Dezaktywowanie trasy...";

        $http.post('http://' + $rootScope.IP + ':50000/Track/Restore/' + WybraneId, config)
          .success(function (status, headers, config) {
            $scope.CallbackServera = true;
            $scope.CallbackServeraPositive = true;
            $scope.komunikat = "Trasa został aktywowana pomyślnie!";
            $scope.usuniecie = false
            $scope.dodanie = true
            $scope.initMarkers();
          })
          .error(function (status, header, config) {
            $scope.ResponseDetails =
              "<hr />status: " + status +
              "<hr />headers: " + header +
              "<hr />config: " + config;
            console.log($scope.ResponseDetails);
            $scope.CallbackServera = true;
            $scope.CallbackServeraNegative = true;
            $scope.komunikat = "Coś poszło nie tak!";
          });

      }
    }

  }]);
  app.controller('ShowCourseController', ['$scope', '$routeParams', '$http', '$rootScope', '$timeout', function ($scope, $routeParams, $http, $rootScope, $timeout) {

    var WybraneId = $routeParams.id;
    $scope.sendForm = false;
    //WYSYLANY ID
    $scope.CourseID = WybraneId;

    $http.get('http://' + $rootScope.IP + ':50000/Course/Get/' + WybraneId, {
        //headers: {'Session': ''}
      }
    ).success(function (data, status, headers, config) {
      $scope.course = data;
      $scope.intCourse($scope.course);

      $scope.SubskrypcjaAutobusu = function () {
        $scope.SubskrypcjaKlik = true
        console.log("[Info] Inicjowanie subskrypcji")
        $rootScope.Service.sendAuth($rootScope.globals.Email, $rootScope.globals.Password);
        $rootScope.Service.sendUnSubscribeAll();
        $rootScope.Service.sendSubscribe($scope.course.Bus.Id);
      }
      $scope.SubskrypcjaAutobusu();
      $scope.TrackID = $scope.course.Track.Id
      angular.forEach($scope.course.Activities, function (aktywnosc) {
        if (aktywnosc.ActivityType == 0) {
          aktywnosc.ActivityTypeName = "Sprawdzenie Biletu";
        }
        else if (aktywnosc.ActivityType == 1) {
          aktywnosc.ActivityTypeName = "Kontrola Biletów";
        }
        else if (aktywnosc.ActivityType == 2) {
          aktywnosc.ActivityTypeName = "Incydent z wandalami";
        }
        else if (aktywnosc.ActivityType == 3) {
          aktywnosc.ActivityTypeName = "Problem techniczny";
        }
        else if (aktywnosc.ActivityType == 4) {
          aktywnosc.ActivityTypeName = "Autobus dojechal do przystanku";
        }
        else if (aktywnosc.ActivityType == 5) {
          aktywnosc.ActivityTypeName = "Sprzedano bilet";
        }
        else if (aktywnosc.ActivityType == 6) {
          aktywnosc.ActivityTypeName = "Rozpoczeto kurs";
        }
        else if (aktywnosc.ActivityType == 7) {
          aktywnosc.ActivityTypeName = "Zakonczono kurs";
        }
      });
      //console.log("[Info] Pobrano kurs.");
      //console.log($scope.course);
    })
    $rootScope.KursWebSocketReloadActive = true
    $rootScope.KursyTrasyWebSocketActive = false
    $rootScope.KursWebSocketReload = function () {
      $http.get('http://' + $rootScope.IP + ':50000/Course/Get/' + WybraneId, {
          //headers: {'Session': ''}
        }
      ).success(function (data, status, headers, config) {
        $scope.course = data;
        $scope.intCourse($scope.course);

        angular.forEach($scope.course.Activities, function (aktywnosc) {
          if (aktywnosc.ActivityType == 0) {
            aktywnosc.ActivityTypeName = "Sprawdzenie Biletu";
          }
          else if (aktywnosc.ActivityType == 1) {
            aktywnosc.ActivityTypeName = "Kontrola Biletów";
          }
          else if (aktywnosc.ActivityType == 2) {
            aktywnosc.ActivityTypeName = "Incydent z wandalami";
          }
          else if (aktywnosc.ActivityType == 3) {
            aktywnosc.ActivityTypeName = "Problem techniczny";
          }
          else if (aktywnosc.ActivityType == 4) {
            aktywnosc.ActivityTypeName = "Autobus dojechal do przystanku";
          }
          else if (aktywnosc.ActivityType == 5) {
            aktywnosc.ActivityTypeName = "Sprzedano bilet";
          }
          else if (aktywnosc.ActivityType == 6) {
            aktywnosc.ActivityTypeName = "Rozpoczeto kurs";
          }
          else if (aktywnosc.ActivityType == 7) {
            aktywnosc.ActivityTypeName = "Zakonczono kurs";
          }
        });
        //console.log("[Info] Pobrano kurs.");
        //console.log($scope.course);
      })

    }
  }]);
  /* Użytkownicy Controlery
   *==========================================================================*/
  app.controller('UserController', function ($scope, $http, $rootScope) {

    /*$scope.users = [
     {Id: 0, Email: 'dev@wp.pl', Rank: 0, Status: 0, Details: "Opis...?"},
     {Id: 1, Email: 'dev2@wp.pl', Rank: 1, Status: 1, Details: "Opis...?"},
     {Id: 1, Email: 'dev2@wp.pl', Rank: 1, Status: 1, Details: "Opis...?"},
     {Id: 2, Email: 'dev3@wp.pl', Rank: 2, Status: 0, Details: "Opis...?"}
     ];*/

    $http.get('http://' + $rootScope.IP + ':50000/user/GetUserList', {
      //headers: {'Session': ''}
    }).success(function (data, status, headers, config) {
      $scope.users = data;
      //console.log("Pobrano liste userów.");
      //console.log(data);
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
  app.controller('AddUserController', function ($scope, $http, $timeout, $rootScope) {
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
          $http.post('http://' + $rootScope.IP + ':50000/user/SelfRegister', data, config)
            .success(function (data, status, headers, config) {
              $scope.PostDataResponse = data;
              console.log($scope.PostDataResponse);
              $scope.CallbackServeraPositive = true;
              $scope.CallbackServera = true;

              $scope.initMarkers();
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
  app.controller('ShowUserController', ['$scope', '$routeParams', '$http', '$rootScope', function ($scope, $routeParams, $http, $rootScope) {

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

    $http.get('http://' + $rootScope.IP + ':50000/user/getUser/' + WybraneId, {
        //headers: {'Session': ''}
      }
    ).success(function (data, status, headers, config) {
      //$scope.user = data;
      //console.log("Pobrano usera.")
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
  app.controller('MapController', function (NgMap, $scope, $http, $timeout, $rootScope) {
    var wrapper = $('.wrapper');

    $scope.lat = 53.77842200000001;
    $scope.lng = 20.48011930000007;

    $scope.markerIcon = "../blocks/googleMaps/src/busstopMarker.png";

    $scope.setPostitionBusstop = function (id) {
      $http.get('http://' + $rootScope.IP + ':50000/Busstop/GetBusstop/' + id
      ).success(function (data, status, headers, config) {
        $scope.busstop = data;
        $scope.lat = $scope.busstop.Lat;
        $scope.lng = $scope.busstop.Lng;
        $scope.initMap()
        console.log("Błąd pobrania przystanku.")
      });
    };

    ///////////////////////////////////////////////////////////////

    NgMap.getMap().then(function (map) {
      $scope.map = map;
    });


    $scope.busstopMarker = [];

    $scope.deleteMarkers = function () {
      $scope.markerBusstopCheck = [];
      $scope.markerEnd = [];
      $scope.markerIncydent = [];
      $scope.markerKanar = [];
      $scope.markerSellTicket = [];
      $scope.markerStart = [];
      $scope.markerTechnicla = [];
      $scope.markerTicket = [];

      $scope.busstopMarker = [];
      $scope.busMarker = [];
      $scope.activityMarker = [];
    };

    $scope.showBusstop = function (event, busstop) {
      $scope.selectedBusstop = busstop;
      $scope.map.showInfoWindow('myInfoWindow', this);
    };


    $scope.showBusstopMarkers = function () {
      $scope.markerIcon = "../blocks/googleMaps/src/busstopMarker.png";

      $scope.busstopMarkers = [];

      $http.get('http://' + $rootScope.IP + ':50000/Busstop/GetBusstopList/'
      ).success(function (data, status, headers, config) {
        $scope.busstop = data;
        //console.log($scope.przystanki);
        //console.log("Pobrano liste przystanków.");
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
          if (przystanek.BusStopStatus == 1) {
            $scope.busstopMarkers.push({
              Id: przystanek.Id,
              Name: przystanek.Name,
              LocalizationString: przystanek.LocalizationString,
              GotMachineName: przystanek.GotMachineName,
              GotKioskName: przystanek.GotKioskName,
              BusStopTypeName: przystanek.BusStopTypeName,
              Position: [przystanek.Lat, przystanek.Lng]
            });
          }


        });
      }).error(function (data, status, headers, config) {
        console.log("Błąd pobrania przystanków.")
      });

      $scope.busstopMarker = $scope.busstopMarkers;

    };

    /////////////////////////////////////////////////////////////////////////

    $scope.wayPoints = [];
    $scope.origin;
    $scope.destination;

    $scope.initTrack = function (track) {
      $scope.drawRoute(track);
    };
    $scope.drawRoute = function (track) {
      $scope.markerBusstopCheck = [];
      $scope.markerEnd = [];
      $scope.markerIncydent = [];
      $scope.markerKanar = [];
      $scope.markerSellTicket = [];
      $scope.markerStart = [];
      $scope.markerTechnicla = [];
      $scope.markerTicket = [];
      $scope.busMarker = [];
      $scope.busstopMarker = [];
      $scope.busstopMarkers = [];
      $scope.punkty = [];
      $scope.markerIcon = "../blocks/googleMaps/src/busstopMarkerGreen.png";
      angular.forEach(track.BusStops, function (przystanek) {
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
        if (przystanek.BusStopStatus == 1) {
          $scope.busstopMarkers.push({
            Id: przystanek.Id,
            Name: przystanek.Name,
            LocalizationString: przystanek.LocalizationString,
            GotMachineName: przystanek.GotMachineName,
            GotKioskName: przystanek.GotKioskName,
            BusStopTypeName: przystanek.BusStopTypeName,
            Position: [przystanek.Lat, przystanek.Lng]
          });
          $scope.punkty.push({location: {lat: przystanek.Lat, lng: przystanek.Lng}});
        }
      });

      var start = $scope.punkty[0];
      var end = $scope.punkty[$scope.punkty.length - 1]
      $scope.punkty.splice(0, 1);
      $scope.punkty.splice($scope.punkty.length - 1, 1);

      $scope.wayPoints = $scope.punkty;
      //console.log("Punkty");
      //console.log($scope.wayPoints);
      $scope.origin = start;
      //console.log("Start");
      //console.log($scope.origin);
      $scope.destination = end;
      //console.log("end");
      //console.log($scope.destination);

      $scope.initMap();
      $scope.map.directionsRenderers[0].setMap($scope.map);

      $scope.busstopMarker = $scope.busstopMarkers;

    };


    ////////////////////////////////////////////////////////////////////////

    $scope.initMarkers = function () {
      $scope.deleteMarkers();
      $scope.wayPoints = [];
      $scope.showBusstopMarkers();
      $scope.showBusMarkers();

      $scope.map.directionsRenderers[0].setMap(null);

    };

    ////////////////////////Aktywności//////////////////////////
    $scope.showActivity = function (event, activity) {
      $scope.selectedActivity = activity;
      $scope.map.showInfoWindow('ActivityInfoWindow', this);
    };


    $scope.markerBusstopCheck = [];
    $scope.markerEnd = [];
    $scope.markerIncydent = [];
    $scope.markerKanar = [];
    $scope.markerSellTicket = [];
    $scope.markerStart = [];
    $scope.markerTechnicla = [];
    $scope.markerTicket = [];

    $scope.intCourse = function (kurs) {
      $scope.markerBusstopCheck = [];
      $scope.markerEnd = [];
      $scope.markerIncydent = [];
      $scope.markerKanar = [];
      $scope.markerSellTicket = [];
      $scope.markerStart = [];
      $scope.markerTechnicla = [];
      $scope.markerTicket = [];
      $scope.busMarker = [];

      angular.forEach(kurs.Activities, function (aktywnosc) {
        if (aktywnosc.ActivityType == 0) {
          aktywnosc.ActivityTypeName = "Sprawdzenie Biletu";
          $scope.markerTicket.push({
            Id: aktywnosc.Id,
            Name: aktywnosc.ActivityTypeName,
            Position: [aktywnosc.Lat, aktywnosc.Lng]
          });
        }
        else if (aktywnosc.ActivityType == 1) {
          aktywnosc.ActivityTypeName = "Kontrola Biletów";
          $scope.markerKanar.push({
            Id: aktywnosc.Id,
            Name: aktywnosc.ActivityTypeName,
            Position: [aktywnosc.Lat, aktywnosc.Lng]
          });
        }
        else if (aktywnosc.ActivityType == 2) {
          aktywnosc.ActivityTypeName = "Incydent z wandalami";
          $scope.markerIncydent.push({
            Id: aktywnosc.Id,
            Name: aktywnosc.ActivityTypeName,
            Position: [aktywnosc.Lat, aktywnosc.Lng]
          });
        }
        else if (aktywnosc.ActivityType == 3) {
          aktywnosc.ActivityTypeName = "Problem techniczny";
          $scope.markerTechnicla.push({
            Id: aktywnosc.Id,
            Name: aktywnosc.ActivityTypeName,
            Position: [aktywnosc.Lat, aktywnosc.Lng]
          });
        }
        else if (aktywnosc.ActivityType == 4) {
          aktywnosc.ActivityTypeName = "Autobus dojechal do przystanku";
          $scope.markerBusstopCheck.push({
            Id: aktywnosc.Id,
            Name: aktywnosc.ActivityTypeName,
            Position: [aktywnosc.Lat, aktywnosc.Lng]
          });
        }
        else if (aktywnosc.ActivityType == 5) {
          aktywnosc.markerSellTicket = "Sprzedano bilet";
          $scope.markerIncydent.push({
            Id: aktywnosc.Id,
            Name: aktywnosc.ActivityTypeName,
            Position: [aktywnosc.Lat, aktywnosc.Lng]
          });
        }
        else if (aktywnosc.ActivityType == 6) {
          aktywnosc.ActivityTypeName = "Rozpoczeto kurs";
          $scope.markerStart.push({
            Id: aktywnosc.Id,
            Name: aktywnosc.ActivityTypeName,
            Position: [aktywnosc.Lat, aktywnosc.Lng]
          });
        }
        else if (aktywnosc.ActivityType == 7) {
          aktywnosc.ActivityTypeName = "Zakonczono kurs";
          $scope.markerEnd.push({
            Id: aktywnosc.Id,
            Name: aktywnosc.ActivityTypeName,
            Position: [aktywnosc.Lat, aktywnosc.Lng]
          });
        }

      });
      $scope.busMarker.push({
        Id: kurs.Bus.Id,
        Name: kurs.Bus.BusNumber,
        Position: [kurs.Activities[kurs.Activities.length - 1].Lat, kurs.Activities[kurs.Activities.length - 1].Lng]
      });
    };


    ///////////////////Autobusy////////////////////////////////
    $scope.busMarker = [];
    $scope.showBusMarkers = function () {


      $scope.busMarkers = [];

      $http.get('http://' + $rootScope.IP + ':50000/Course/GetList/'
      ).success(function (data, status, headers, config) {
        $scope.course = data;
        $scope.SubskrypcjaAutobusow = function () {
          $scope.SubskrypcjaKlik = true
          //console.log("[Info] Inicjowanie subskrypcji wszystkich autobusów w widoku ogolnym")
          $rootScope.Service.sendAuth($rootScope.globals.Email, $rootScope.globals.Password);
          $rootScope.Service.sendSubscribeAll();
        }
        $scope.SubskrypcjaAutobusow();

        angular.forEach($scope.course, function (kurs) {

          if (kurs.Ended == false) {

            $scope.busMarkers.push({
              Id: kurs.Bus.Id,
              Name: kurs.Bus.BusNumber,
              Position: [kurs.Activities[kurs.Activities.length - 1].Lat, kurs.Activities[kurs.Activities.length - 1].Lng]
            });
            //console.log("test");
            //console.log($scope.busMarkers);
            //console.log("--------------");
          }
        });
      }).error(function (data, status, headers, config) {
        console.log("Błąd pobrania przystanków.")
      });

      $scope.busMarker = $scope.busMarkers;
    };
    $rootScope.showBusMarkersReload = function () {
      $scope.busMarkers = [];

      $http.get('http://' + $rootScope.IP + ':50000/Course/GetList/'
      ).success(function (data, status, headers, config) {
        $scope.course = data;

        angular.forEach($scope.course, function (kurs) {

          if (kurs.Ended == false) {

            $scope.busMarkers.push({
              Id: kurs.Bus.Id,
              Name: kurs.Bus.BusNumber,
              Position: [kurs.Activities[kurs.Activities.length - 1].Lat, kurs.Activities[kurs.Activities.length - 1].Lng]
            });
          }
        });
        $rootScope.busMarkersToSub = $scope.busMarkers
      }).error(function (data, status, headers, config) {
        console.log("Błąd pobrania przystanków.")
      });
      $scope.busMarker = $scope.busMarkers;
    };


    $scope.initMap = function () {
      google.maps.event.trigger($scope.map, 'resize');
    };
    $scope.initMapTimeout = function () {
      $timeout(function () {
        google.maps.event.trigger($scope.map, 'resize');
      }, 500);
    }


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
  app.controller('WebSocket', function ($websocket, $rootScope) {
    var ws = $websocket('ws://' + $rootScope.IP + ':7878');
    var collection = [];
    $rootScope.Service = {};

    ws.onMessage(function (message) {
      console.info("message: ", message.data);
      collection.push(JSON.parse(message.data));
      if ($rootScope.KursWebSocketReloadActive) {
        $rootScope.KursWebSocketReload();
      }
      if ($rootScope.KursyTrasyWebSocketActive) {
        $rootScope.KursyTrasyWebSocket();
      }
      $rootScope.showBusMarkersReload()
    });

    ws.onOpen(function (message) {
      console.log("Connection open!", message);
    });

    ws.onClose(function () {
      console.log("Closing the socket.")
    });

    ws.onError(function (message) {
      console.info("Error in socket", message);
    });

    $rootScope.Service.sendAuth = function () {
      var data = {Email: 'lukraik@gmail.com', Password: 'Password@123'};
      var obj = {
        Action: "user.login",
        Data: JSON.stringify(data)
      };
      ws.send(JSON.stringify(obj));
    }
    $rootScope.Service.sendSubscribe = function (busId) {
      var data = {EventType: 0, IdOfObject: busId}; //0 = busmove
      var obj = {
        Action: "subscribe",
        Data: JSON.stringify(data)
      };
      ws.send(JSON.stringify(obj));
    }
    $rootScope.Service.sendUnSubscribe = function (busId) {
      var data = {EventType: 0, IdOfObject: busId};
      var obj = {
        Action: "unsubscribe",
        Data: JSON.stringify(data)
      };
      ws.send(JSON.stringify(obj));
    }
    $rootScope.Service.sendSubscribeAll = function () {
      var data = {EventType: 0};
      var obj = {
        Action: "subscribeAll",
        Data: JSON.stringify(data)
      };
      ws.send(JSON.stringify(obj));
    }
    $rootScope.Service.sendUnSubscribeAll = function () {
      var data = {EventType: 0};
      var obj = {
        Action: "unsubscribeAll",
        Data: JSON.stringify(data)
      };
      ws.send(JSON.stringify(obj));
    }
  });
})();

