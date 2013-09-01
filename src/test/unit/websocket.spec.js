var ws = require("../../../src/websocket").websocket;

describe("webSocket", function() {
  var websocket;
  var mockCore;
  var mockSocketIO;


  beforeEach(function() {
    mockCore = jasmine.createSpyObj('core', ['listParticipants']);
    mockSocketIO = {
      sockets: jasmine.createSpyObj('sockets', ['on', 'emit'])
    };
    websocket = ws(mockSocketIO, mockCore);
  });

  it('sendRefreshMessage() write to socket with participants', function() {
    var room = "aRoom";
    var participants = ["a","b"];

    mockCore.listParticipants.andReturn(participants)

    websocket.sendRefreshMessage(room);

    expect(mockCore.listParticipants).toHaveBeenCalledWith(room);

    expect(mockSocketIO.sockets.emit).toHaveBeenCalledWith('voteRefresh', jasmine.any(Object));
    var capturedParam = mockSocketIO.sockets.emit.mostRecentCall.args[1]

    expect(capturedParam.room).toEqual(room);
    expect(capturedParam.votes).toEqual(participants);
  });
});