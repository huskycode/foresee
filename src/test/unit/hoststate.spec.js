// Generated by CoffeeScript 1.4.0
var hostStateModule, should, state;

should = require("should");

hostStateModule = require("../../../src/hoststate");

state = hostStateModule.hoststate;

describe("hoststate", function() {
  it('returns true if currentState equals to INITIAL', function() {
    var currentState;
    currentState = state.INITIAL;
    return currentState.should.eql(state.INITIAL);
  });
  it('returns true if currentState equals to STARTED', function() {
    var currentState;
    currentState = state.STARTED;
    return currentState.should.eql(state.STARTED);
  });
  return it('is not equal to other states', function() {
    return state.INITIAL.should.not.eql(state.STARTED);
  });
});