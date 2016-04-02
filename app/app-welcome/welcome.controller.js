/**
 * Created by msobiecki on 02.04.16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function WelcomeController(UserService, $location, $rootScope, FlashService) {

    }

})();