# Coffee or Riots #
Projekt Zespołowy przy współpracy z firmą Netland

## System zarządzania ruchem i geolokalizacją autobusów ##

System monitorowania i zarządzania flotą autobusów obejmie cały tabor zarządzany przez MPK. Będzie dostarczał informacji o stanie pojazdów i przekazywał do systemu Tablic Informacyjnych informacje o geograficznym położeni autobusu.

### Twórcy ###

* Michał Sobiecki
* Grzegorz Sawiński
* Łukasz Zimnoch
* Rafał Kopryk

# Postman Api #

Dodałem kontroler z api dla postmana, wystarczy dla postmana wskazac adres do importu: "http://localhost:50000/Postman/Get".

# Rejestracja(POST): #
http://localhost:50000/User/SelfRegister

```
#!Json

{
    "Email":"lukraik97@gmail.com",
    "Password":"test123"
}
```

# Zwrotka: #

```
#!Json

{
  "Email": "lukraik97@gmail.com",
  "Rank": 0,
  "Activated": false,
  "Details": null
}
```


Przychodzi email z tokenem

# Potwierdzenie rejestracji(POST): #
http://localhost:50000/User/ActivateUser

```
#!Json

{
    "Token":"691080c4-8fa6-47fa-b382-75dfae8d4c81",
    "Email":"lukraik97@gmail.com",
    "Password":"test123"
}
```

# Zwrotka #

```
#!Json

{ "Activated":"true" }

```

# Logowanie(POST): #
http://localhost:50000/User/Login

```
#!Json

{
    "Email":"lukraik94@gmail.com",
    "Password":"test123"
}
```

# Zwrotka #

```
#!Json

{
  "Result": true,
  "Token": "cb0cd250-7f63-4b80-bf06-b7ead283d8e1"
}
```


Potem autoryzacja po nagłówki Session, przykład:
GET /Bus/GetBusList 
HTTP/1.1

Host: localhost:50000
Session: cb0cd250-7f63-4b80-bf06-b7ead283d8e1

Cache-Control: no-cache


# Wylogowywanie(POST): #
http://localhost:50000/User/Logout
Bez treści
Zwrotka pusta



# WebApi #

może sie pojawić problem z rezerwowaniem adresów. Należy wtedy w konsoli(z uprawnieniami administratora) wpisać:


```
#!
netsh http add urlacl url=http://+:50000/ user=[nazwaUżytkownikaKomputera]
```
# 

#Post do webApi przykładowo w jquery #


```
#!javascript

$.ajax({
  type: "POST",
  url: "http://localhost:50000/Test/TestPost",
  data: '{"Test":"asdasd"}',
crossDomain: true,
  success: function(result){console.log(result)},
contentType: "application/json",
    dataType: 'json'
});
```
w data powinien znajdować się jsonowy odpowiednik obiektu modelu w parametrze akcji kontrolera

# WebSocketServer #

Przykładowe użycie serwera:

```
#!javascript

var ws = new WebSocket("ws://localhost:7878");
        ws.onmessage = function(data){console.log(data);}
        var data = {BusId:'1',BusStopId:'2'};
        var obj = {
          Action: "busStop.Activity",
          Data: JSON.stringify(data)
        };

        ws.send(JSON.stringify(obj));
```

obj główny:

```
#!c#
    public class MessageDto
    {
        public string Action { get; set; }
        public string Data { get; set; }
    }

```
obj zwrotki:

```
#!c#
    public class MessageResultDto
    {
        public ResultState State { get; set; }
        public string Data { get; set; }
    }
```
Tyle, że dostaje się je w JSON'ie.
Zawartość data przy wysyłaniu i odbieraniu zależna od akcji. Teoretycznie od strony front endu, jedyne co będzie potrzebne to połączenie się z serverem + zautoryzowanie się by dostawać na bierząco eventy aktywności.

# Aktywności #
Przykład subskrypcji na aktywności jest zawarty w pliku fakeRead.js, należy się zautoryzować danymi użytkownika (funkcja sendAuth). Obiekt zwracany w on msg ma strukturę:

```
#!javascript
{Id: 2, Lat: 45.3, Lng: 45.3, Info: "BusStopCheck"}

```