describe('foresee.moderator.LoginCtrl', function() {
    var $scope = null;
    var ctrl = null;

    var location;

    beforeEach(module('foresee'));

    beforeEach(inject(function($rootScope, $controller, $location) {
        $scope = $rootScope.$new();

        location = $location;

        ctrl = $controller('foresee.moderator.LoginCtrl', {
            $scope: $scope,
        });


    }));

    it('should start with blank name', function() {
        expect($scope.roomName).toEqual('');
    });

    it('should redirect when create room with non-empty room name', function() {
        $scope.roomName = "room name!@#$%^&*_+";
        $scope.createRoom();
        expect(location.path()).toBe('/host/' + 'room%20name!%40%23%24%25%5E%26*_%2B');
    });

    it('should show error message when create room with empty room name', function() {
        $scope.roomName = "";
        $scope.createRoom();
        expect($scope.modMsg).toEqual("room name must not blank.");
        expect(location.path()).toBe('');
    });
});
