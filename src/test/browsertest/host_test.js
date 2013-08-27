describe('foresee.moderator.StoryCtrl', function() {
    var httpBackend;
    var scope;
    var ctrl;

    beforeEach(module('foresee'));

    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        //create a scope object for us to use.
        scope = $rootScope.$new();
        httpBackend = $httpBackend;

        ctrl = $controller('foresee.moderator.StoryCtrl', {
             $scope: scope
        });


    }));
    it("should add story to pile when ajax call success & enable StartNow buton when respond > 0", function() {
      executeAndVerifyStoryPileAndStartNowStatus('{"s1": null, "s2": null}', ["s1", "s2"], false);
    });

    it("should add story to pile when ajax call success & do NOT enable StartNow buton when respond = 0", function() {
      executeAndVerifyStoryPileAndStartNowStatus('{}', [], true);
    });

    var executeAndVerifyStoryPileAndStartNowStatus = function(mockRepond, expectedStoryPile, expectedStartNowStatus) {
      scope.roomId = 1;
      scope.storyDesc = "desc";

      httpBackend.expectGET("/story/add/room/" + scope.roomId + "/story/" + scope.storyDesc).respond(mockRepond);
      expect(scope.startNowDisable).toBe(true);

      //execute
      scope.addStory();
      httpBackend.flush();

      expect(scope.storyPile).toEqual(expectedStoryPile);
      expect(scope.startNowDisable).toBe(expectedStartNowStatus);
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

    var data = { "room": "thisRoom", "votes": { "login-page": null, "estimate-page": 1 }  };

    mockWebSocket.on.mostRecentCall.args[1](data);

    expect(scope.participants).toEqual(['login-page','estimate-page']);
  });

  it("should not update participant list when vote Refresh with different room", function() {
    scope.init("thisRoom");

    var data = { "room": "notThisRoom", "votes": { "login-page": null, "estimate-page": 1 }  };

    mockWebSocket.on.mostRecentCall.args[1](data);

    expect(scope.participants).toEqual([]);
  });

  it("should remove participant when [x] is clicked", function() {
    scope.participants = ["login-page", "estimate-page", "result-page"];

    scope.removeParticipant("estimate-page");

    expect(scope.participants).toEqual(["login-page","result-page"]);
  });

  it("should emit remove participant event when [x] is clicked", function() {
    scope.init("aRoomName");
    scope.removeParticipant("estimate-page");

    var lastEmitCall = mockWebSocket.emit.mostRecentCall;
    expect(lastEmitCall.args[0]).toEqual("removeParticipant");
    expect(lastEmitCall.args[1]).toEqual({
      "room": "aRoomName",
      "name": "estimate-page"
    });
  });
});

