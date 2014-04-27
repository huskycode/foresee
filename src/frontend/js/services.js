app.factory('socketIO', function () {
   return io;
});

app.factory('webSocket', function ($rootScope, socketIO) {
    var socket = socketIO.connect();

  socket.on("pong", function() {
    console.log("got pong")
  });
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function (data) {
                $rootScope.$apply(function () {
                    callback.apply(socket, [JSON.parse(data)]);
                });
            });
        },
        emit: function (eventName, data) {
            socket.emit(eventName, JSON.stringify(data));
        }
    };
});
