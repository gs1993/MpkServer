/**
 * Created by salimike on 18.03.16.
 */

$(document).ready(function () {
  $('.panelDodajUsers__close').on("click", function () {
    $('.panelDodajUsers').toggleClass('-hidden');
  });

  $('#panel-DodajUsersButton').on("click", function () {
    $('.panelDodajUsers').toggleClass('-hidden');
  });
});