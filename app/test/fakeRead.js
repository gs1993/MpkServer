var deviceWebstocket = new WebSocket("ws://192.168.1.138:7878");
deviceWebstocket.onmessage = function(data){console.log(data);}

var sendAuth = function(){
	var data = {Email:'lukraik@gmail.com',Password:'Password@123'};
        var obj = {
          Action: "user.login",
          Data: JSON.stringify(data)
        };
	deviceWebstocket.send(JSON.stringify(obj));
}
var sendSubscribe = function(busId){
	var data = {EventType:0,IdOfObject:busId}; //0 = busmove
	var obj = {
          Action: "subscribe",
          Data: JSON.stringify(data)
        };
	deviceWebstocket.send(JSON.stringify(obj));
}
var sendUnSubscribe = function(busId){
	var data = {EventType:0,IdOfObject:busId};
	var obj = {
          Action: "unsubscribe",
          Data: JSON.stringify(data)
        };
	deviceWebstocket.send(JSON.stringify(obj));
}