var deviceWebstocket = new WebSocket("ws:" + host + ":7878");
deviceWebstocket.onmessage = function (data) {
    toastr.info(data.data);
    console.log(data);
}

var sendAuth = function (email, password) {
    var data = {
        Email: email, Password: password
    };
    var obj = {
        Action: "user.login",
        Data: JSON.stringify(data)
    };
    deviceWebstocket.send(JSON.stringify(obj));
}

var sendActivity = function (x, y, type, addInfo) {
    var data = {
        DeviceId: '1', Lat: x, Lng: y, Type: type, AdditionalInfo: addInfo
    };
    var obj = {
        Action: "activity.send",
        Data: JSON.stringify(data)
    };
    deviceWebstocket.send(JSON.stringify(obj));
}

var sampleStartCourse = function () {
    var latlng = marker.getLatLng();
    sendActivity(latlng.lat, latlng.lng, 6, "TRACKID=1;");   // ID TRASY
}

var sampleBusStop = function () {
    var latlng = marker.getLatLng();
    sendActivity(latlng.lat, latlng.lng, 4, "STOPID=1;"); // ID PRZYSTANKU
}

var sampleControl = function () {
    var latlng = marker.getLatLng();
    sendActivity(latlng.lat, latlng.lng, 1, "CATCHAMOUT=3;"); // ID PRZYSTANKU
}

var sampleBusEndCourse = function () {
    var latlng = marker.getLatLng();
    sendActivity(latlng.lat, latlng.lng, 7, "");
}

var sampleTicketCount = function () {
    var latlng = marker.getLatLng();
    sendActivity(latlng.lat, latlng.lng, 0, "");
}