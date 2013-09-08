var websocket = function(socketio, core) {

  function _sendRefreshMessage(room) {
    socketio.sockets.in(room).emit('voteRefresh', {
      room: room,
      votes: core.listParticipants(room)
    });
  }

  function _broadcast(room, event) {
    socketio.sockets.in(room).emit( event, {
    });
  }

  socketio.sockets.on('connection', function(socket) {
    socket.on('subscribe', function(data) {
      socket.join(data.room);
    });
    socket.on('removeParticipant', function(data) {
      core.removeParticipant(data.room, data.name);

      _sendRefreshMessage(data.room);
    });
    socket.on('ask', function(data) {
      _sendRefreshMessage(data.room);
    });
    socket.on('vote', function(data) {
      core.vote(data.room, data.name, data.vote);
      _sendRefreshMessage(data.room);
    });

    socket.on('start', function(data) {
      _broadcast( data.room, "startRoom" );
    });
  });

  return {
    sendRefreshMessage: _sendRefreshMessage
  };
}

exports.websocket = websocket;

