var deviceWebstocket = new WebSocket("ws://localhost:7878");
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
	var data = {EventType:1,IdOfObject:busId};
	var obj = {
          Action: "subscribe",
          Data: JSON.stringify(data)
        };
	deviceWebstocket.send(JSON.stringify(obj));
}
var sendUnSubscribe = function(busId){
	var data = {EventType:1,IdOfObject:busId};
	var obj = {
          Action: "unsubscribe",
          Data: JSON.stringify(data)
        };
	deviceWebstocket.send(JSON.stringify(obj));
}
