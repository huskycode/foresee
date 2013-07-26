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
        var capturedData;

        beforeEach(function() {
            callback = function(data) {
              capturedData = data;
            };
            webSocket.on("myEvent", callback);
        });

        it('should call socketIO with correct event name', function() {
            expect(mockSocket.on.mostRecentCall.args[0]).toEqual("myEvent");
        });

        it('should call socketIO with correct callback function', function() {
            mockSocket.on.mostRecentCall.args[1]("callbackData");
            expect(capturedData).toEqual("callbackData");
        });
    });

    describe("emit()", function() {
      it('should call emit with correct parameter', function() {
        var eventName = "myEvent";
        var data = { "some": "Data"};

        webSocket.emit(eventName, data);

        expect(mockSocket.emit.mostRecentCall.args[0]).toEqual(eventName);
        expect(mockSocket.emit.mostRecentCall.args[1]).toEqual(data);
      });
    });
});