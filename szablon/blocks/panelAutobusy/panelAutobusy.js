/**
 * Created by salimike on 18.03.16.
 */

$(document).ready(function () {
  $('.panelAutobusy__close').on("click", function () {
    $('.panelAutobusy').toggleClass('-hidden');
  });
  $(function () {
    $(".panelAutobusy").resizable({
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
  $(".js-example-placeholder-single.typ").select2({
    placeholder: "Wybierz typ",
    allowClear: true,
    showSearchBox: false,
    width: '100%',
    minimumResultsForSearch: -1

  });
});
