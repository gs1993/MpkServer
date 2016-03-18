/**
 * Created by rafal on 11.03.2016.
 */

$(document).ready(function () {
  $('.header__corner').on("mouseenter", function () {
    $('.header__switcher').toggleClass('-hidden');
  });

  $('.header__switcher').on("click", function () {
    $('.header__switcher').toggleClass('-hidden');
  });
});
