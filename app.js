var port;

var server = require('./src/index');

port = server.port;

server.listen(port, function() {
    return console.log("Listening on " + port + "\nPress CTRL-C to stop server.");
});

function terminate(signal) {
    console.log('Got ' + signal + '. exiting');
    process.exit(0)
}

process.on('SIGINT', function() { terminate('SIGINT') });
process.on('SIGQUIT', function() { terminate('SIGQUIT') });
process.on('SIGTERM', function() { terminate('SIGTERM') });

