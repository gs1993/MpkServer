var deviceWebstocket = new WebSocket("ws://localhost:7878");
deviceWebstocket.onmessage = function(data){console.log(data);}

var marker = undefined;

var mymap = L.map('mapid').setView([53.7784, 20.4801], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);

mymap.on('click',addMarker);

function addMarker(e){
    // Add marker to map at click location; add popup window
    if(marker!=undefined)mymap.removeLayer(marker);
    marker = new L.marker(e.latlng).addTo(mymap);
}

var sendAuth = function(){
	var data = {Email:'driver1',Password:'Password@123'};
	var obj = {
		Action: "user.login",
		Data: JSON.stringify(data)
	};
	deviceWebstocket.send(JSON.stringify(obj));
}
var sendActivity = function(x,y,type,addInfo){
	var data = {DeviceId:'1',Lat:x,Lng:y,Type:type,AdditionalInfo:addInfo};
	var obj = {
			  Action: "activity.send",
			  Data: JSON.stringify(data)
	};
	deviceWebstocket.send(JSON.stringify(obj));
}

var sampleStartCourse = function(){
	var latlng = marker.getLatLng();
	sendActivity(latlng.Lat,latlng.Lng,6,"TRACKID=1;");   // ID TRASY
}

var sampleBusStop = function(){
	var latlng = marker.getLatLng();
	sendActivity(latlng.Lat,latlng.Lng,4,"STOPID=1;")		// ID PRZYSTANKU
}

var sampleBusEndCourse  = function(){
	var latlng = marker.getLatLng();
	sendActivity(latlng.Lat,latlng.Lng,7,"");
}

var sampleTicketCount  = function(){
	var latlng = marker.getLatLng();
	sendActivity(latlng.Lat,latlng.Lng,0,"");
}


/*
public enum ActivityType
    {
        TicketCheck=0,
        Control=1,
        CivilIncident=2,
        TechnicalProblems=3,
        BusStopCheck=4,
        TicketSell=5,
        StartCourse=6,
        EndCourse=7
    }
*/