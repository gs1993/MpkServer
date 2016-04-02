/**
 * Created by msobiecki on 02.04.16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            if (vm.user.passwordagain === vm.user.password) {
                UserService.Create(vm.user)
                    .then(function (response) {
                        if (response.success) {
                            FlashService.Success('Konto zostało zarejestrowane.', true);
                            $location.path('/login');
                        } else {
                            FlashService.Error(response.message);
                            vm.dataLoading = false;
                        }
                    });
            }
            else
            {
                FlashService.Error('Podane hasła nie sa identyczne.', true);
                vm.dataLoading = false;
            }
        }
    }

})();