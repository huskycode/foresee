should = require("should")

coreModule = require("../src/core")
core = coreModule.core
cache = coreModule.cache

describe("core", () ->
  describe "story", ->
    it 'host add new story and stories list should contain new story.', ->
      result = core.listStories('roomName')
      should.exist(result)
      result.should.eql({})

      core.addStory("roomName", "story1")
      result = core.listStories('roomName')
      should.exist(result)
      result.should.eql({story1: null})

  describe "participant", ->
    it 'add participant should set value in data.', ->
      cache.clear()
      core.addParticipant('roomName', 'myName')
      result = cache.get('roomName').participants
      should.exist(result)
      Object.keys(result).should.have.lengthOf(1)
      (result.myName == null).should.be.true

    it 'add two participant should set 2 value in data.', ->
      cache.clear()
      core.addParticipant('roomName', 'myName')
      core.addParticipant('roomName', 'anothorName')
      result = cache.get('roomName').participants
      should.exist(result)
      Object.keys(result).should.have.lengthOf(2)
      (result.myName == null).should.be.true
      (result.anothorName == null).should.be.true

    it 'list participants will return object of participants' , ->
      cache.clear()
      expectParticipants = {'myName':null}
      cache.put('roomName',{'participants':expectParticipants})
      participants = core.listParticipants('roomName')
      participants.should.eql(expectParticipants)

    it 'remove participant should remove specified participant form participant list.', ->
      #Given two participants exist
      cache.clear()
      core.addParticipant('roomName', 'participant1')
      core.addParticipant('roomName', 'participant2')

      #When we remove a participant
      core.removeParticipant('roomName', 'participant1')

      #Then only one participant exists in room
      participants = core.listParticipants('roomName')
      participants.should.eql({"participant2":null})

  describe "getData", ->
    it "should return blank object when cache is undefined", ->
        cache.clear()
        core.getData("roomName").should.eql({})

    it "should return blank object when cache is null", ->
        cache.clear()
        cache.put('roomName', null)
        core.getData("roomName").should.eql({})

    it "should return data when cache has data", ->
        anyData = {"anyData"}
        cache.clear()
        cache.put('roomName', anyData)
        core.getData("roomName").should.eql(anyData)

  describe "ensureRoomExist", ->
    it 'should put blank object into room if cache.get(room) is null.', ->
      cache.clear()
      cache.put('roomName', null)
      core.ensureRoomExist('roomName')
      cache.get('roomName').should.eql({})

    it 'should put blank object into room if cache.get(room) is undefined.', ->
      cache.clear()
      core.ensureRoomExist('roomName')
      cache.get('roomName').should.eql({})

  describe "vote", ->
    it 'should put cast result to participant', ->
      cache.clear()
      expectResult = {participants: {myName: 2}}
      cache.put('roomName', {'participants': {myName: null}})
      core.vote('roomName', 'myName', 2)
      cache.get('roomName').should.eql(expectResult)
)