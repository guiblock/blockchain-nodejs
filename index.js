const express = require("express");
const app = express();
const WebSocketServer = require('websocket').server;
const http = require('http');
const setupMethod = require('./modules/setupMethods');

const httpServer =  http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

const wsServer = new WebSocketServer({
    httpServer,
    autoAcceptConnections: false
});

/** Start express **/
const expressStart = require("./modules/expressStart");
expressStart(app);

/** Boot no express **/
const portExpress = 80;
app.listen(portExpress, function () {
    console.log("BlockChain API listening on port " + portExpress);
});

/** Boot no websocket **/
const portWS = 85;
httpServer.listen(portWS, function () {
    console.log(('BlockChain Websocket is listening on port ' + portWS);
});

setupMethod(app, wsServer);
