/**
 * Created by salimike on 18.03.16.
 */

$(document).ready(function () {
  $('.panelWyswietlAutobus__close').on("click", function () {
    $('.panelWyswietlAutobus').toggleClass('-hidden');
  });

  $('.WyswietlautobusyButton').on("click", function () {
    $('.panelWyswietlAutobus').toggleClass('-hidden');
  });
  $('.panelWyswietlAutobus__navigation .-abort').on("click", function () {
    $('.panelWyswietlAutobus').toggleClass('-hidden');
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