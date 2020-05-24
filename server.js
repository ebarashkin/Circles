'use strict';

const express = require('express'); //Берём Express
const app = express(); //Создаем Express-приложение
const server = require('http').Server(app);
const Websocket = require('websocket').server;


//Создаем маршрут для главной страницы
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Настраиваем подключение статических файлов
app.use(express.static('public'));

server.listen(8080, () => {
  console.log('Listen port 8080');
});

const ws = new Websocket({
  httpServer: server,
  autoAcceptConnections: false
});

let map = new Map();
let i = 0;

ws.on('request', req => {

  const connection = req.accept('', req.origin);
  map.set(connection, ++i);
  console.log(` Подключение №${i} ` + connection.remoteAddress);

  connection.on('message', message => {

    const dataName = message.type + 'Data';
    const data = message[dataName];
    console.log('Inbox: ' + data);

    for (let client of map.keys()){
      client.send(data);
      console.log('Send: ' + data);
    }

  });
 
  connection.on('close', (reasonCode, description) => {

    console.log(`Отключение №${map.get(connection)} ` + connection.remoteAddress );
    map.delete(connection)
  });
});