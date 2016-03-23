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
});