var websocket = function(core) {
  return {

  sendRefreshMessage: function(socket, room) {
    return socket.emit('voteRefresh', {
      room: room,
      votes: core.listParticipants(room)
    });
  }

  };
}

exports.websocket = websocket;

