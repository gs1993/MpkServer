var deviceWebstocket = new WebSocket("ws://localhost:7878");
deviceWebstocket.onmessage = function(data){console.log(JSON.parse(JSON.parse(data.data).Data));}

var sendAuth = function(){
	var data = {Email:'lukraik@gmail.com',Password:'Password@123'};
        var obj = {
          Action: "user.login",
          Data: JSON.stringify(data)
        };
	deviceWebstocket.send(JSON.stringify(obj));
}
var sendActive = function(busStopId){
	var data = {BusId:'1',BusStopId:busStopId};
	var obj = {
			  Action: "busStop.Activity",
			  Data: JSON.stringify(data)
	};
	deviceWebstocket.send(JSON.stringify(obj));
}

