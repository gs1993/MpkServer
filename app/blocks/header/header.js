/**
 * Created by rafal on 11.03.2016.
 */

$(document).ready(function () {
  $('.header__corner').on("click", function () {
    $('.header__switcher').toggleClass('-hidden');
    $('.headerProfile__switcher').addClass('-hidden');
    $('.wrapper').removeClass('-open');
    $('.header__corner').removeClass('-open');
    $('.headerProfile__corner').removeClass('-open');
    $('.headerLogo').removeClass('-hidden');
  });

  $('.header__item').on("click", function () {
    $('.header__switcher').toggleClass('-hidden');
    $('.wrapper').addClass('-open');
    $('.header__corner').addClass('-open');
    $('.headerLogo').addClass('-hidden');
  });

  $('.headerProfile__corner').on("click", function () {
    $('.headerProfile__switcher').toggleClass('-hidden');
    $('.header__switcher').addClass('-hidden');
    $('.wrapper').removeClass('-open');
    $('.header__corner').removeClass('-open');
    $('.headerLogo').removeClass('-hidden');
  });

  $('.headerProfile__item').on("click", function () {
    $('.headerProfile__switcher').toggleClass('-hidden');
    $('.wrapper').addClass('-open');
    $('.headerProfile__corner').addClass('-open');
    $('.headerLogo').addClass('-hidden');
  });
  $('.WelcomeClick').on("click", function () {
    $('.wrapper').addClass('-open');
    $('.headerProfile__corner').addClass('-open');
    $('.headerLogo').addClass('-hidden');
  });
  //$(window).resize(function(){
   // $('.wrapper').removeClass('-open');
   // $('.header__corner').removeClass('-open');
  //  $('.headerProfile__corner').removeClass('-open');
  //});
});
