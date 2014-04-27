describe('foresee.moderator.VoteCtrl', function() {
    var scope;
    var ctrl;

    beforeEach(function () {
        module('foresee')

        inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            mockWebSocket = {
                on: jasmine.createSpy(),
                emit: jasmine.createSpy()
            };


            ctrl = $controller('foresee.participant.VoteCtrl', {
                $scope: scope,
                webSocket: mockWebSocket
            });
        });
    });

    it("should list vote options as fibonacci", function () {
        expect(scope.options).toEqual([1,2,3,5,8,13,20,40,60,100]);
    });
});
