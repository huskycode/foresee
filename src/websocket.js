var websocket = function(socketio, core) {

  function _sendRefreshMessage(room) {
    socketio.sockets.emit('voteRefresh', {
      room: room,
      votes: core.listParticipants(room)
    });
  }

  socketio.sockets.on('connection', function(socket) {
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
  });

  return {
    sendRefreshMessage: _sendRefreshMessage
  };
}

exports.websocket = websocket;

