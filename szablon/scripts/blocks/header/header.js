/**
 * Created by rafal on 11.03.2016.
 */

$(document).ready(function () {
  $('.header__corner').on("click", function () {
    $('.header__switcher').toggleClass('-hidden');
    $('.headerProfile__switcher').addClass('-hidden');
    $('.panel').addClass('-hidden');
  });

  $('.header__item').on("click", function () {
    $('.header__switcher').toggleClass('-hidden');
  });

  $('.headerProfile__corner').on("click", function () {
    $('.headerProfile__switcher').toggleClass('-hidden');
    $('.header__switcher').addClass('-hidden');
    $('.panel').addClass('-hidden');
  });

  $('.headerProfile__item').on("click", function () {
    $('.headerProfile__switcher').toggleClass('-hidden');
  });

  $('#panel-loginButton').on("click", function () {
    $('.panelLogin').toggleClass('-hidden');
  });
    $('#panel-registerButton').on("click", function () {
        $('.panelRegister').toggleClass('-hidden');
    });

});
