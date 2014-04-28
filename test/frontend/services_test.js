describe("foresee.service.webSocket", function() {
    var mockSocketIo, mockSocket, webSocket, scope;

    beforeEach(angular.mock.module('foresee'));

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
        this.webSocket.on("myEvent", callback); 
      });

      it('should call socketIO with correct event name', function() {
          expect(mockSocket.on.mostRecentCall.args[0]).toEqual("myEvent"); 
      });

      it('should call socketIO with correct callback function', function() {
          var json = {a:"b"};
          var jsonString = JSON.stringify(json);

          mockSocket.on.mostRecentCall.args[1](jsonString);
          expect(capturedData).toEqual(json); 
      }); 
    });

    describe("emit()", function() { 
      it('should call emit with eventName and stringify json', function() {
        var eventName = "myEvent";
        var data = { "some": "Data"};

        this.webSocket.emit(eventName, data);

        expect(mockSocket.emit.mostRecentCall.args[0]).toEqual(eventName);
        expect(mockSocket.emit.mostRecentCall.args[1]).toEqual(JSON.stringify(data));
      });
    });
});
