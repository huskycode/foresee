var app, assets, core, express, io, route, sendRefreshMessage, server, hostname;

core = require("./core").core;
route = require("./route").route;
hostname = require('./hostname');

express = require('express');
assets = require('connect-assets');

app = express();
server = require('http').createServer(app);
server.port = process.env.PORT || process.env.VMC_APP_PORT || 3000;

app.use(express["static"](process.cwd() + '/src/frontend'));

var socketio = require('socket.io').listen(server, {
  'log level': 1
});
var websocket = require("./websocket").websocket(socketio, core);

app.get('/url', function(req, res) {
    return res.json({
        url: "http://" + hostname.properHostname(req.headers.host),
        socketUrl: "http://" + req.headers.host
    });
});
app.get('/story/add/room/:room/story/:story', route.addStory);
app.get('/stories/:room', route.listStories);

module.exports = server;

module.exports.route = route;
