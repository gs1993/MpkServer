//Init 
var latlng = undefined;

var busId = 1;

var mymap = L.map('mapid').setView([53.7784, 20.4801], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);



//Download busstops
$.ajax({
    url: "http://" + host + ":50000/BusStop/BusStopLocalizationList",
    type: "GET",
    beforeSend: function (xhr) { xhr.setRequestHeader('Debug', 'debug'); },
    success: function (data) {
        data.forEach(function (elem) {
            var marker = new L.Marker(L.latLng(elem.Lat, elem.Lng)).addTo(mymap);
            marker.on('click', function () {
                clickEvent({ latlng: L.latLng(elem.Lat, elem.Lng) }, 4);
                $("#addInfo").val(elem.Id);
                $("#popup").dialog('option', 'title', elem.Name);
            });
        });

    }
});


mymap.on('click', function (e) {
    $("#popup").dialog('option', 'title', "Niestandardowa aktywność");
    clickEvent(e);
});
//Logowanie
L.easyButton('fa-key', function (btn, map) {
    var html = '<p>Podpowiedź: Email: driver1, Password: Password@123</p>' +
        '<label for="login">Login</label>' +
        '<input id="login" type="text"/>' +
        '<label for="password">Hasło</label>' +
        '<input id="password" type="text"/>' +
        '<button id="loginPopupOk">Logowanie</button>';

    $("#popup").html(html);

    $("#loginPopupOk")
        .click(function () {
            sendAuth($("#login").val(), $("#password").val());
            toastr.info("Próba logowania");
            $("#popup").dialog("close");
        });

    $("#popup").dialog('option', 'title', "Logowanie");

    $("#popup").dialog("open");
}).addTo(mymap);


//BusId
L.easyButton('fa-bus', function (btn, map) {
    var html = 
        '<label for="busId">BusId:</label>' +
        '<input id="busId" type="text"/>' +
        '<button id="busIdOk">Ok</button>';

    $("#popup").html(html);

    $("#busIdOk")
        .click(function () {
            busId = $("#busId").val();
            toastr.info("Ustawiam busId");
            $("#popup").dialog("close");
        });

    $("#popup").dialog('option', 'title', "Ustawianie busId");

    $("#popup").dialog("open");
}).addTo(mymap);


$("#popup").dialog({
    width: "auto",
    height: "auto",
    autoOpen: false,
    show: {
        effect: "blind",
        duration: 100
    },
    hide: {
        effect: "explode",
        duration: 400
    }
});

function clickEvent(e, val) {
    // Add latlng to map at click location; add popup window
    latlng = e.latlng;

    var html = '<label for="lat">Lat:</label>' +
        '<input id="lat" type="text"/><br />' +

        '<label for="lng">Lat:</label>' +
        '<input id="lng" type="text"/><br />' +

        '<label for="deviceId">Id busa</label>' +
        '<input id="deviceId" type="text"/><br />' +

        '<label for="addInfo">Dodatkowa informacja(trackid/stopid/catchamout)</label>' +
        '<input id="addInfo" type="text"/><br />' +

        '<label for="type">Typ aktywności:</label>' +
        '<select id="type">' +
        '<option value="0">TicketCheck</option>' +
        '<option value="1">Control</option>' +
        '<option value="6">StartCourse</option>' +
        '<option value="4">BusStopCheck</option>' +
        '<option value="7">EndCourse</option>' +
        '</select><br />' +

        '<button id="Send">Send</button>';

    $("#popup").html(html);

    $('#lat').val(latlng.lat);
    $('#lng').val(latlng.lng);
    $('#type').val(val);
    $('#deviceId').val(busId);

    $("#Send")
        .click(function () {
            var addinfo = "";
            switch ($('#type').val()) {
                case "6":
                    addinfo = "TRACKID=" + $("#addInfo").val() + ";";
                    break;
                case "4":
                    addinfo = "STOPID=" + $("#addInfo").val() + ";";
                    break;
                case "1":
                    addinfo = "CATCHAMOUT=" + $("#addInfo").val() + ";";
                    break;
                default:
                    break;
            }

            sendActivity($('#lat').val(), $('#lng').val(), $('#type').val(), addinfo);
            toastr.info("Wysłano aktywność!");
            $("#popup").dialog("close");
        });

    $("#popup").dialog("open");
}
