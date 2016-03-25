/**
 * Created by salimike on 18.03.16.
 */

$(document).ready(function () {
  $('.panelPrzystanki__close').on("click", function () {
    $('.panelPrzystanki').toggleClass('-hidden');
  });
  $(function () {
    $(".panelPrzystanki").resizable({
      alsoResize: ".panelPrzystanki__list",
      containment: "#containerDrag",
      minHeight: 400,
      maxHeight: 800,
      minWidth: 500
    });
  });
  $(".js-example-placeholder-multiple.linie").select2({
    placeholder: "Wpisz lub wybierz linie",
    width: '100%'
  });
});