should = require("should")

hostStateModule = require("../src/hoststate")
state = hostStateModule.hoststate

describe "hoststate", () ->
	it 'returns true if currentState equals to INITIAL', () ->
        currentState = state.INITIAL
        currentState.should.eql(state.INITIAL) 

    it 'returns true if currentState equals to STARTED', () ->
        currentState = state.STARTED
        currentState.should.eql(state.STARTED) 

    it 'is not equal to other states', () -> 
        state.INITIAL.should.not.eql(state.STARTED) 
