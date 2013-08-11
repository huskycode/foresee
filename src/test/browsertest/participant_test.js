describe('Participant State', function() {
    var ps = null;

    beforeEach(function () {
        ps = new ParticipantState();
    });

    it("should have correct possible states defined", function() {
        expect(ps.possibleStates).toEqual(["join","wait", "started"]);
    });

    it("should be able to get the state name", function() {
        expect(ps.state).toBeDefined();
    });

    it("should start with the join state", function() {
        expect(ps.state).toEqual("join");
    });

    it("should be able to change to new valid state", function() {
        ps.to("wait");

        expect(ps.state).toEqual("wait");
    });

    it("should not be able to change to invalid state", function() {
        var func = function() { ps.to("someInvalidState"); };

        expect(func).toThrow("Invalid state: someInvalidState");
    });
});


describe('Participant Page', function() {
    var pp, mobile;
    beforeEach(function(){
        jasmine.Ajax.useMock();
        mobile = jasmine.createSpyObj('mobile', [
            'showPageLoadingMsg', 'hidePageLoadingMsg', 'changePage']);
        var jq = $;
        var settings = {name: null};
        pp = new ParticipantJoinPage(jq, settings);
        jq.mobile = mobile;
        pp.roomIdValue = function(){return "roomID";}
        pp.socketUrlValue = function(){return "http://localhost:3333";}
        pp.getNameValue = function(){return "userName";}
    });

    it("transition to vote page after register for name.", function() {
        pp.joinRoom();
        var request = mostRecentAjaxRequest();
        expect(request.url).toEqual("/join/room/roomID/name/userName")
        request.response({
           status: 200,
           responseText: ''
        });

        expect(mobile.changePage).toHaveBeenCalled();
        expect(mobile.changePage.mostRecentCall.args[0]).toEqual("#p2");
    });
});