app.factory('socketIO', function () {
   return io;
});

app.factory('webSocket', function ($rootScope, socketIO) {
    var socket = io('http://localhost:3000');

    return {
        on: function (eventName, callback) {
            console.log("regis:" + eventName);
            socket.on(eventName, function (data) {
                console.log("on" + JSON.parse(data));

                $rootScope.$apply(function () {
                    callback.apply(socket, [JSON.parse(data)]);
                });
            });
        },
        emit: function (eventName, data) {
            console.log("emit" + JSON.stringify(data));
            socket.emit(eventName, JSON.stringify(data));
        }
    };
});
