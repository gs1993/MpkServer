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

  $(".js-example-placeholder-single.crud").select2({
    placeholder: "Wybierz",
    allowClear: true,
    width: '100%',
    minimumResultsForSearch: -1

  });
  $(".js-example-placeholder-single.scrud").select2({
    placeholder: "Wybierz",
    allowClear: true,
    width: '100%',
  });
});