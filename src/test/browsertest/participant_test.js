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
    var pp, jq;
    beforeEach(function(){
        jasmine.Ajax.useMock();
        jq = $;
        pp = mockParticipantPage(jq);
        jq.mobile = mockMobile();
    });

    it("transition to waiting page after register for name.", function() {
        pp.joinRoom();
        var request = mostRecentAjaxRequest();
        expect(request.url).toEqual("/join/room/roomID/name/userName")
        request.response({
           status: 200,
           responseText: ''
        });

        expect(jq.mobile.changePage).toHaveBeenCalled();
        expect(jq.mobile.changePage.mostRecentCall.args[0]).toEqual("#waiting");
    });

    it("", function() {
        // given
        // at waiting state

        // when
        // server response with story

        // then
        // change state to voting
    }

    it("", function() {
       // given
       // at waiting page

       // when
       // socket.emit(ask)
       // result is story(n)

       // then
       // transition to voting page.

    });
});


function mockMobile() {
    return jasmine.createSpyObj('mobile', [
            'showPageLoadingMsg', 'hidePageLoadingMsg', 'changePage']);
}

function mockParticipantPage(jq) {
    var settings = {name: null};
    var pp = new ParticipantJoinPage(jq, settings);
    pp.roomIdValue = function(){return "roomID";}
    pp.socketUrlValue = function(){return "http://localhost:3333";}
    pp.getNameValue = function(){return "userName";}
    return pp;
}