require("coffee-script");
var port;

var server = require('./src/index');

port = server.port;

server.listen(port, function() {
    return console.log("Listening on " + port + "\nPress CTRL-C to stop server.");
});

