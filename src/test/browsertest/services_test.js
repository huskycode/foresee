var mockSocketIo, mockSocket, webSocket, scope;

describe("foresee.service.webSocket", function() {

    beforeEach(module('foresee'));

    beforeEach(function() {
        mockSocketIo = { connect: null };
        mockSocket = {
            on: jasmine.createSpy(),
            emit: jasmine.createSpy()
        };

        spyOn(mockSocketIo, 'connect').andReturn(mockSocket);

        module(function($provide) {
            $provide.value('socketIO', mockSocketIo);
        });

        inject(function($rootScope, webSocket) {
            this.webSocket = webSocket;
        });
    });

    it('should call connect when the service is instantiated', function() {
        expect(mockSocketIo.connect).toHaveBeenCalled();
    });

    describe("on()", function() {
        var callback;

        beforeEach(function() {
            callback = function(data) {

            };
            webSocket.on("myEvent", callback);
        });

        it('should call socketIO with correct event name', function() {
            expect(mockSocket.on.mostRecentCall.args[0]).toEqual("myEvent");
        });
    });

});