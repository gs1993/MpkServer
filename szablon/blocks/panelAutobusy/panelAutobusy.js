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
});