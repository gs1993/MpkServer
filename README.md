# Coffee or Riots #
Projekt Zespołowy przy współpracy z firmą Netland

## System zarządzania ruchem i geolokalizacją autobusów ##

System monitorowania i zarządzania flotą autobusów obejmie cały tabor zarządzany przez MPK. Będzie dostarczał informacji o stanie pojazdów i przekazywał do systemu Tablic Informacyjnych informacje o geograficznym położeni autobusu.

### Twórcy ###

* Michał Sobiecki
* Grzegorz Sawiński
* Łukasz Zimnoch
* Rafał Kopryk

# Autoryzacja #
Tymczasowo(?) autoryzacja do serwisu restowego(webApi) jest na zasadzie nagłówka Authorization: Basic.
Przy każdym zapytaniu do kontrolera w nagłówkach musi się znajdować nagłówek:

```
#!
Authorization: Basic (base64)loginUzytkownika+haslo
```
w innym przypadku zwracany jest błąd autoryzacji

możliwa w przyszłości zmiana na sesje itp ale na ten moment wydaje mi się to zbędne

# Nagłówek cors #

```
#!c#

[EnableCors("*","*","*")]
```
Jak sama nazwa mówi pozwala na CORS, przydawało mi się do testowania przy pomocy konsoli na innych stronach. W przyszłości do wyrzucenia.


# Entity framework #
w razie problemów z bazą danych
na solucji Data należy uruchomić console nuget i wpisać
update-database


# WebApi #

w razie problemu z postawieniem servera na systemie może sie pojawić problem z rezerwowaniem adresów. Należy wtedy w konsoli(z uprawnieniami administratora) wpisać:


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