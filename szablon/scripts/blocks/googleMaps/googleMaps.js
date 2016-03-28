"use strict";

function initGoogleMaps() {
  var markersAutobusow = [0, 53.777867, 20.482681, 'Autobus Przykładowy 1', 1, 53.77842200000001, 20.48011930000007, 'Autobus Przykładowy 2', 2, 53.776835, 20.479475, 'Autobus Przykładowy 2'];
  var markersPRzystankow = [0, 53.775884, 20.489850, 'Przystanek Przykładowy 1', 1, 53.773838, 20.478438, 'Przystanek Przykładowy 2', 2, 53.772614, 20.474951, 'Przystanek Przykładowy 3'];

  var info = new google.maps.InfoWindow({
    maxWidth: 200
  });

  function initialize() {
    var myOptions = {
      zoom: 15,
      center: new google.maps.LatLng(53.77842200000001, 20.48011930000007),
      navigationControl: true,
      panControl: true,
      zoomControl: true,
      disableDefaultUI: true,
      rotateControl: true,
      overviewMapControl: true,
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.DEFAULT
      },
      mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DEFAULT
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMaps"), myOptions);
    for (var i = 0; i < markersAutobusow.length;) {
      var markerOption =
      {
        map: map,
        position: new google.maps.LatLng(markersAutobusow[i+1], markersAutobusow[i+2]),
        title: markersAutobusow[i+3],
        icon: 'blocks/googleMaps/src/busMarker.png'
      };
      var marker = new google.maps.Marker(markerOption);
      i=i+4;
    }
    for (var i = 0; i < markersPRzystankow.length;) {
      var markerOption =
      {
        map: map,
        position: new google.maps.LatLng(markersPRzystankow[i+1], markersPRzystankow[i+2]),
        title: markersPRzystankow[i+3],
        icon: 'blocks/googleMaps/src/busstopMarker.png'
      };
      var marker = new google.maps.Marker(markerOption);
      i=i+4;
    }
  }

  google.maps.event.addDomListener(window, 'load', initialize);
}

$(document).ready(function () {
  if ($('#googleMaps').length > 0) {
    initGoogleMaps();
  }
});