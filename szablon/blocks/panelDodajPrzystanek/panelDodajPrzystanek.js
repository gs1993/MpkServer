/**
 * Created by salimike on 18.03.16.
 */

$(document).ready(function () {
  $('.panelDodajPrzystanek__close').on("click", function () {
    $('.panelDodajPrzystanek').toggleClass('-hidden');
  });

  $('#panel-DodajPrzystanekButton').on("click", function () {
    $('.panelDodajPrzystanek').toggleClass('-hidden');
  });
});