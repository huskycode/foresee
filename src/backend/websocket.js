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
      core.startRoom(data.room)
      _broadcast( data.room, "startRoom" );
    });
    socket.on('join', function(data) {
      core.addParticipant(data.room, data.name);
      _sendRefreshMessage(data.room);
    });

    socket.on('resetVote', function(data) {
      core.resetVotes(data.room);
      _sendRefreshMessage(data.room);
    });
  });

  return {
    sendRefreshMessage: _sendRefreshMessage
  };
}

exports.websocket = websocket;

