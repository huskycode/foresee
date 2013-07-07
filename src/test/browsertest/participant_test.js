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