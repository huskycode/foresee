var mockSocketIo, webSocket;

describe("foresee.service.webSocket", function() {

    beforeEach(module('foresee'));

    beforeEach(function() {
        mockSocketIo = { connect: jasmine.createSpy() };

        module(function($provide) {
            $provide.value('socketIO', mockSocketIo);
        });

        inject(function($injector) {
            webSocket = $injector.get('webSocket');
        });
    });

    it('should call connect when the service is instantiated', function() {
        expect(mockSocketIo.connect).toHaveBeenCalled();
    });

});