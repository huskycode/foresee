describe('foresee.moderator.StoryCtrl', function() {
    var httpBackend;
    var scope;
    var ctrl;
    var roomId = 1;

    beforeEach(function() {
      module('foresee')

      inject(function($rootScope, $controller, $httpBackend) {
        //create a scope object for us to use.
        scope = $rootScope.$new();
        scope.$parent.roomId = 1;
        httpBackend = $httpBackend;
        mockWebSocket = {
          on: jasmine.createSpy(),
          emit: jasmine.createSpy()
        };

        ctrl = $controller('foresee.moderator.StoryCtrl', {
             $scope: scope,
             webSocket: mockWebSocket
        });
      });
    });

    it("should add story to pile when ajax call success & enable StartNow buton when respond > 0", function() {
        var mockRespond = '{"s1": null, "s2": null}';
        httpBackend.expectGET( "/stories/" + scope.roomId ).respond(mockRespond);

        executeAndVerifyStoryPile(mockRespond, ["s1", "s2"]);
    });

    it("should add story to pile when ajax call successr", function() {
        var mockRespond = [];
        httpBackend.expectGET( "/stories/" + scope.roomId ).respond(mockRespond);

        executeAndVerifyStoryPile('{}', mockRespond);
    });

    //Ignore this for now.
    xit("should update storyPile when first visit", function() {
      // given
      // call /stories/roomName should return story
      var mockRespond = '{"s1":null}';
      httpBackend.expectGET("/stories/" + scope.roomId ).respond(mockRespond);
       
      // when
      httpBackend.flush();
      // then
      // storyPile has list of story.
      expect(scope.storyPile).toEqual(["s1"]);
    });

    var executeAndVerifyStoryPile = function(mockRespond, expectedStoryPile) {
      scope.roomId = 1;
      scope.storyDesc = "desc";

      httpBackend.expectGET("/story/add/room/" + scope.roomId + "/story/" + scope.storyDesc).respond(mockRespond);

      //execute
      scope.addStory();
      httpBackend.flush();

      expect(scope.storyPile).toEqual(expectedStoryPile);
    }
});

describe('foresee.moderator.ParticipantListCtrl', function() {
  var scope;
  var mockWebSocket;

  beforeEach(module('foresee'));

  beforeEach(inject(function($rootScope, $controller) {
    //create a scope object for us to use.
    scope = $rootScope.$new();
    mockWebSocket = {
      on: jasmine.createSpy(),
      emit: jasmine.createSpy()
    };


    ctrl = $controller('foresee.moderator.ParticipantListCtrl', {
      $scope: scope,
      webSocket: mockWebSocket
    });


  }));

  it("should initialize participants with empty list", function() {
      expect(scope.participants).toEqual([]);
  });

  it("init() should initialize room name", function() {
    scope.init("aRoomName");

    expect(scope.roomName).toEqual("aRoomName");
  });

  it("should update participant list when vote Refresh", function() {
    scope.init("thisRoom");

    var data = { "room": "thisRoom", "votes": { "participant1": null, "participant2": 1 }  };

    mockWebSocket.on.mostRecentCall.args[1](data);

    expect(scope.participants).toEqual(['participant1','participant2']);
  });

  it("should not update participant list when vote Refresh with different room", function() {
    scope.init("thisRoom");

    var data = { "room": "notThisRoom", "votes": { "participant1": null, "participant2": 1 }  };

    mockWebSocket.on.mostRecentCall.args[1](data);

    expect(scope.participants).toEqual([]);
  });

  it("should remove participant when [x] is clicked", function() {
    scope.participants = ["participant1", "participant2", "result-page"];

    scope.removeParticipant("participant2");

    expect(scope.participants).toEqual(["participant1","result-page"]);
  });

  it("should emit remove participant event when [x] is clicked", function() {
    scope.init("aRoomName");
    scope.removeParticipant("participant2");

    var lastEmitCall = mockWebSocket.emit.mostRecentCall;
    expect(lastEmitCall.args[0]).toEqual("removeParticipant");
    expect(lastEmitCall.args[1]).toEqual({
      "room": "aRoomName",
      "name": "participant2"
    });
  });


});

describe('foresee.moderator.CardCtrl', function() {
  var scope;
  var mockWebSocket;

  beforeEach(module('foresee'));

  beforeEach(inject(function($rootScope, $controller) {
    //create a scope object for us to use.
    scope = $rootScope.$new();
    mockWebSocket = {
      on: jasmine.createSpy(),
      emit: jasmine.createSpy()
    };


    ctrl = $controller('foresee.moderator.CardCtrl', {
      $scope: scope,
      webSocket: mockWebSocket
    });


  }));

  // it("Should emit subscribe with roomName", function(){

  //   var lastEmitCall = mockWebSocket.emit.mostRecentCall;
  //   expect(lastEmitCall.args[0]).toEqual("subscribe");
  //   expect(lastEmitCall.args[1]).toEqual({
  //     "room": "roomName"
  //   });
  // });

  it("convertToCard() Should return object in a right stucture", function() {
    dataInput = { 
      "room": "RoomName",
      "votes": { 
        "mrA": 1,
        "mrB": null
      }
    };

    var result = scope.convertToCard(dataInput);

    expect(result[0]).toEqual({"name" : "mrA", "score" : 1});
    expect(result[1]).toEqual({"name" : "mrB", "score" : null});
  });

  it("displayChar() should return '-' when vote value of participant is null.", function() {
    dataInput = [{"name" : "mrB", "score" : null}];
    expectedOutput = [{"name" : "mrB", "score" : "-"}]

    var result = scope.displayChar(dataInput);

    expect(result).toEqual(expectedOutput);
  });

  it("displayChar() should return '?' when at least a participant is null.", function() {
    dataInput = [{"name" : "mrA", "score" : 1}, {"name" : "mrB", "score" : null}];
    expectedOutput = [{"name" : "mrA", "score" : '?'}, {"name" : "mrB", "score" : "-"}]

    var result = scope.displayChar(dataInput);

    expect(result).toEqual(expectedOutput);
  });

  it("displayChar() should return all number when all voted", function() {
    dataInput = [{"name" : "mrA", "score" : 1}, {"name" : "mrB", "score" : 2}];
    expectedOutput = [{"name" : "mrA", "score" : 1}, {"name" : "mrB", "score" : 2}]

    var result = scope.displayChar(dataInput);

    expect(result).toEqual(expectedOutput);
  });

  it("Should update participantCard when voteRefresh", function(){
    var data = { "room": "thisRoom", "votes": { "participant1": null, "participant2": 1 }  };

    mockWebSocket.on.mostRecentCall.args[1](data);

    expect(scope.participantCards).toEqual([{"name" : "participant1", "score" : '-'}, {"name" : "participant2", "score" : '?'}]);
  });

});
