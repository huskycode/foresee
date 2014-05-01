describe('foresee.moderator.HostCtrl', function() {
    var httpBackend;
    var scope;
    var ctrl;
    var roomId = 1;

    beforeEach(function() {
        module('foresee')

        function setParentScopeRoomId() {
            scope.$parent.roomId = "abc";
        }

        inject(function($rootScope, $controller) {
            //create a scope object for us to use.
            scope = $rootScope.$new();

            setParentScopeRoomId();

            mockWebSocket = {
                on: jasmine.createSpy(),
                emit: jasmine.createSpy()
            };

            ctrl = $controller('foresee.moderator.HostCtrl', {
                $scope: scope,
                webSocket: mockWebSocket
            });
        });
    });

    it("should send a voteReset message with roomId", function() {
        scope.resetVote();

        var lastEmitCall = mockWebSocket.emit.mostRecentCall;
        expect(lastEmitCall.args[0]).toEqual("resetVote");
        expect(lastEmitCall.args[1]).toEqual({
            "room": scope.$parent.roomId
        });
    });
});