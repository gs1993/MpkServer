/**
 * Created by salimike on 18.03.16.
 */

$(document).ready(function () {
  $('.panelDodajAutobus__close').on("click", function () {
    $('.panelDodajAutobus').toggleClass('-hidden');
  });

  $('#panel-DodajautobusyButton').on("click", function () {
    $('.panelDodajAutobus').toggleClass('-hidden');
  });
});