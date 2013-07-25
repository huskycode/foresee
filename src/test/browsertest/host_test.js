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

  it("should update participant list when vote Refresh", function() {
    // Given:
    // data = { votes: { p1: null, p2: 1, }  };

    // when:
    // webSocket.voteRefresh(data);

    // then:
    // scope.participants == ['p1','p2'];
  });

  it("should remove participant when [x] is clicked", function() {
//    $(document).on("click", "a.removeParticipant", function(evt) {
//      var participantName;
//      participantName = $(evt.srcElement).attr("participant_name");
//      console.log("Removing participant with name : " + participantName);
//      return socket.emit("removeParticipant", {
//        room: roomId,
//        name: participantName
//      });
//    });
  });
});

