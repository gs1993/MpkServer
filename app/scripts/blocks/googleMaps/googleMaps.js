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
      styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"46"},{"color":"#666666"},{"weight":"0.91"},{"gamma":"0.00"},{"lightness":"40"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"saturation":"-5"},{"gamma":"4.31"},{"visibility":"off"},{"lightness":"-10"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"off"},{"saturation":"-5"},{"color":"#ff0000"},{"gamma":"8.63"},{"weight":"4.01"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#666666"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"10"},{"color":"#666666"},{"weight":"0.59"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"off"},{"saturation":"-4"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"saturation":"1"},{"color":"#656565"}]},{"featureType":"administrative","elementType":"labels.icon","stylers":[{"visibility":"off"},{"color":"#985959"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","elementType":"all","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"transit.line","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station","elementType":"all","stylers":[{"visibility":"off"},{"saturation":"-14"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]}],
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
  $(window).resize(function(){
    initGoogleMaps();
  });
});