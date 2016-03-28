/**
 * Created by salimike on 18.03.16.
 */

$(document).ready(function () {
  $('.panelUsers__close').on("click", function () {
    $('.panelUsers').toggleClass('-hidden');
  });
  $(function () {
    $(".panelUsers").resizable({
      alsoResize: ".panelAutobusy__list",
      containment: "#containerDrag",
      minHeight: 400,
      maxHeight: 800,
      minWidth: 500
    });
  });
  $(".js-example-placeholder-single.status").select2({
    placeholder: "Wybierz status",
    allowClear: true,
    showSearchBox: false,
    width: '100%',
    minimumResultsForSearch: -1


  });
  $(".js-example-placeholder-single.ranga").select2({
    placeholder: "Wybierz range",
    allowClear: true,
    showSearchBox: false,
    width: '100%',
    minimumResultsForSearch: -1

  });
});