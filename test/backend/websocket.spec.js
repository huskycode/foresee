var ws = require("../../src/backend/websocket").websocket;

describe("webSocket", function() {
  var websocket;
  var mockCore;
  var mockSocketIO;


  beforeEach(function() {
    mockCore = jasmine.createSpyObj('core', ['listParticipants']);
    mockSocketIO = {
      sockets: {
        in: function(room) {
        },
        on: jasmine.createSpy('on')
      }
    };

    var mockSockets = jasmine.createSpyObj('in', ['emit']);

    spyOn(mockSocketIO.sockets, 'in').andReturn(mockSockets);

    websocket = ws(mockSocketIO, mockCore);
  });

  it('sendRefreshMessage() write to socket with participants', function() {
    var room = "aRoom";
    var participants = ["a","b"];

    mockCore.listParticipants.andReturn(participants)

    websocket.sendRefreshMessage(room);

    expect(mockCore.listParticipants).toHaveBeenCalledWith(room);

    //expect(mockSocketIO.sockets.in(room).emit).toHaveBeenCalledWith('voteRefresh', jasmine.any(Object));
    var capturedParam = mockSocketIO.sockets.in(room).emit.mostRecentCall.args[1]

    expect(capturedParam.room).toEqual(room);
    expect(capturedParam.votes).toEqual(participants);
  });
});