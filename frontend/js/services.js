app.factory('socketIO', function () {
   return io;
});

app.factory('webSocket', function ($rootScope, socketIO) {
    var socket = socketIO.connect();

    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data) {
            socket.emit(eventName, data);
        }
    };
});