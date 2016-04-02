/**
 * Created by rafal on 11.03.2016.
 */

$(document).ready(function () {
  $('.header__corner').on("click", function () {
    $('.header__switcher').toggleClass('-hidden');
    $('.headerProfile__switcher').addClass('-hidden');
    $('.panel').addClass('-hidden');
  });

  $('.header__item').on("click", function () {
    $('.header__switcher').toggleClass('-hidden');
  });

  $('.headerProfile__corner').on("click", function () {
    $('.headerProfile__switcher').toggleClass('-hidden');
    $('.header__switcher').addClass('-hidden');
    $('.panel').addClass('-hidden');
  });

  $('.headerProfile__item').on("click", function () {
    $('.headerProfile__switcher').toggleClass('-hidden');
  });

  $('#panel-loginButton').on("click", function () {
    $('.panelLogin').toggleClass('-hidden');
  });
  $('#panel-registerButton').on("click", function () {
    $('.panelRegister').toggleClass('-hidden');
  });
  $('#panel-odzyskajKontoButton').on("click", function () {
    $('.panelResetPassword').toggleClass('-hidden');
  });

  $('#panel-autobusyButton').on("click", function () {
    $('.panelAutobusy').toggleClass('-hidden');
    //TODO Pobranie listy autobusów
    var uriGetBus = '../api/Bus';

    // Send an AJAX request
    $.getJSON(uriGetBus)
      .done(function (data) {
        // Załadowana lista autobusów
        $.each(data, function (key, item) {
          if (item.BusState == 0) {
            var Status = "Nieaktywny";
          } else if (item.BusState == 1) {
            var Status = "Dostępny";
          } else if (item.BusState == 2) {
            var Status = "W trasie";
          }
          else if (item.BusState == 3) {
            var Status = "W kontroli";
          }
          else {
            var Status = "Niezdefiniowany";
          }
          // Wyświetlanie poszczególnego elementu
          $('<div class="panelList__item">' +
              // Typ Autobusy if 1 Bus else Train
            '<div class="panelList__itemType">' +
            (item.BusType == 1 ? '<div class="fa fa-bus"></div>' : '<div class="fa fa-train"></div>') +
            '</div>' +
              // Numer rejestracyjny Autobusu
            '<div class="panelList__itemName">' +
            item.RegistrationNumber +
            '</div>' +
              // Status Autobusu
              // Aktywny | Nieaktywny | W trasie
            '<div class="panelList__itemStatus">' +
            Status +
            '</div>' +
              // Status Autobusu
              // Aktywny | Nieaktywny | W trasie
            '<div class="panelList__itemBiletomat">' +
            (item.GotMachine == true ? '<div class="fa fa-check-circle-o"></div>' : '<div class="fa fa-times-circle-o"></div>') +
            '</div>' +
              // Nawigacja
            '<div class="panelList__navigation">' +
            '<a href="' + item.Id + '">Zobacz</a>' +
            '</div>' +
            '</div>').appendTo($('#GetBusList'));
        });
      });
    // Send an AJAX request
  });
  $('#panel-przystankiButton').on("click", function () {
    $('.panelPrzystanki').toggleClass('-hidden');
  });
  $('#panel-uzytkownicyButton').on("click", function () {
    $('.panelUsers').toggleClass('-hidden');
  });
});
