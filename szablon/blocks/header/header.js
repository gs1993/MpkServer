/**
 * Created by rafal on 11.03.2016.
 */

$(document).ready(function () {
  $('.header__corner').on("click", function () {
    $('.header__switcher').toggleClass('-hidden');
  });

  $('.header__item').on("click", function () {
    $('.header__switcher').toggleClass('-hidden');
  });

  $('#panel-loginButton').on("click", function () {
    $('.panelLogin').toggleClass('-hidden');
  });
});
