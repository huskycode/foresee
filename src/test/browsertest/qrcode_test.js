//Fake QRCode object for the code to call.
//There has to be a better way to mock this guy and captures its value
capture = {
    id: null,
    url: null
};

QRCode = function(id, url) {
    capture.id = id;
    capture.url = url;
};

describe('qrcode directive', function() {
    var elm, scope;

    // load the tabs code
    beforeEach(module('foresee'));

    beforeEach(inject(function($rootScope, $compile) {
        // we might move this tpl into an html file as well...
        elm = angular.element(
            '<div id="qrcodeId" qrcode url="\'http://www.url.com\'">'
        );

        capture = {id:null, url:null};

        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();
    }));


    it('passes the right id and url to QRCode', inject(function($compile, $rootScope) {
        expect(capture.id).toEqual('qrcodeId');
        expect(capture.url).toEqual('http://www.url.com');
    }));
});