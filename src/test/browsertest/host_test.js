describe('foresee.moderator.StoryCtrl', function() {

 // describe("AddStory Click", function() {
    var httpBackend;
    var scope;
    var ctrl;
    //you need to indicate your module in a test
    beforeEach(module('foresee'));

    /* IMPORTANT!
     * this is where we're setting up the $scope and
     * calling the controller function on it, injecting
     * all the important bits, like our mockService */
    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        //create a scope object for us to use.
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        //now run that scope through the controller function,
        //injecting any services or other injectables we need.
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
//  });
});

