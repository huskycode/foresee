describe('foresee.moderator.LoginCtrl', function() {
    var $scope = null;
    var ctrl = null;

    /* A mocked version of our service, someService
     * we're mocking this so we have total control and we're
     * testing this in isolation from any calls it might
     * be making.
     */
    var mockWindow;

    //you need to indicate your module in a test
    beforeEach(module('foresee'));

    /* IMPORTANT!
     * this is where we're setting up the $scope and
     * calling the controller function on it, injecting
     * all the important bits, like our mockService */
    beforeEach(inject(function($rootScope, $controller) {
        //create a scope object for us to use.
        $scope = $rootScope.$new();

        mockWindow = {
            location: {
                href: null
            }
        }

        //now run that scope through the controller function,
        //injecting any services or other injectables we need.
        ctrl = $controller('foresee.moderator.LoginCtrl', {
            $scope: $scope,
            $window: mockWindow
        });


    }));

    it('should start with blank name', function() {
        expect($scope.roomName).toEqual('');
    });

    it('should redirect when create room with non-empty room name', function() {
        var expectedRoomName = "room name";
        $scope.roomName = expectedRoomName;
        $scope.createRoom();
        expect(mockWindow.location.href).toEqual('host/' + expectedRoomName);
    });

    it('should show error message when create room with empty room name', function() {
        $scope.roomName = "";
        $scope.createRoom();
        expect($scope.modMsg).toEqual("room name must not contain # or blank.");
        expect(mockWindow.location.href).toBeNull();
    });
});
