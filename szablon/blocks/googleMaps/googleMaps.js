"use strict";

function initGoogleMaps() {
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
  }

  google.maps.event.addDomListener(window, 'load', initialize);
}

$(document).ready(function () {
  if ($('#googleMaps').length > 0) {
    initGoogleMaps();
  }
});