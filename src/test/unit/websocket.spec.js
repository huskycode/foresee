var ws = require("../../../src/websocket").websocket;

describe("webSocket", function() {
  var websocket;
  var mockCore;


  beforeEach(function() {
    mockCore = jasmine.createSpyObj('core', ['listParticipants']);
    websocket = ws(mockCore);
  });

  it('sendRefreshMessage() write to socket with participants', function() {
    var mockSocket = jasmine.createSpyObj('socket', ['emit']);
    var room = "aRoom";
    var participants = ["a","b"];

    mockCore.listParticipants.andReturn(participants)

    websocket.sendRefreshMessage(mockSocket, room);

    expect(mockCore.listParticipants).toHaveBeenCalledWith(room);

    expect(mockSocket.emit).toHaveBeenCalledWith('voteRefresh', jasmine.any(Object));
    var capturedParam = mockSocket.emit.mostRecentCall.args[1]

    expect(capturedParam.room).toEqual(room);
    expect(capturedParam.votes).toEqual(participants);
  });
});