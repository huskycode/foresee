should = require("should")

coreModule = require("../src/core")
core = coreModule.core
cache = coreModule.cache

describe("core", () ->
  beforeEach ->
    cache.clear()

  describe "addStory()", ->
    it 'can add first story, #storiesExist', ->
      core.addStory("roomName", "story1")
      result = core.listStories('roomName')
      should.exist(result)
      result.should.eql({story1: null})

  describe "listStory()", ->
    it 'returns blank when no stories, #storiesExist', ->
      result = core.listStories('roomName')
      should.exist(result)
      result.should.eql({})

    it 'stories are listed in order of addition', ->
      core.addStory("roomName", "story1")
      core.addStory("roomName", "story2")
      result = core.listStories('roomName')
      should.exist(result)
      Object.keys(result).should.eql(["story1","story2"])

  describe "addParticipant()", ->
    it 'add first participant should be in list, #participantExists', ->
      core.addParticipant('roomName', 'myName')
      result = core.listParticipants("roomName")
      should.exist(result)
      Object.keys(result).should.eql(["myName"])

    it 'add two participant should set 2 value in data', ->
      core.addParticipant('roomName', 'myName')
      core.addParticipant('roomName', 'anotherName')
      result = cache.get('roomName').participants
      should.exist(result)
      Object.keys(result).should.eql(["myName","anotherName"])

  describe "listParticipant()", ->
    it 'return blank when no participants, #participantExists' , ->
      core.listParticipants('roomName').should.eql({})

    it 'list participants will return object of participants' , ->
      expectParticipants = {'myName':null}
      core.addParticipant('roomName', 'myName')
      participants = core.listParticipants('roomName')
      participants.should.eql(expectParticipants)

  describe "removeParticipant()", ->
    it 'should remove specified participant from set', ->
      #Given two participants exist
      core.addParticipant('roomName', 'participant1')
      core.addParticipant('roomName', 'participant2')

      #When we remove a participant
      core.removeParticipant('roomName', 'participant1')

      #Then only one participant exists in room
      participants = core.listParticipants('roomName')
      participants.should.eql({"participant2":null})

    it 'should not remove anything if a participant does not exist, #participantExists', ->
      core.addParticipant('roomName', 'participant1')  
      core.removeParticipant('roomName', 'someBodyNotHere')
      core.listParticipants('roomName').should.eql({"participant1":null})

  describe "getData()", ->
    it "should return blank object when cache is undefined", ->
        core.getData("roomName").should.eql({})

    it "should return blank object when cache is null", ->
        cache.put('roomName', null)
        core.getData("roomName").should.eql({})

    it "should return data when cache has data", ->
        anyData = {"anyData"}
        cache.put('roomName', anyData)
        core.getData("roomName").should.eql(anyData)

  describe "ensureRoomExist()", ->
    it 'should put blank object into room if cache.get(room) is null.', ->
      cache.put('roomName', null)
      core.ensureRoomExist('roomName')
      cache.get('roomName').should.eql({})

    it 'should put blank object into room if cache.get(room) is undefined.', ->
      core.ensureRoomExist('roomName')
      cache.get('roomName').should.eql({})

  describe "vote()", ->
    it 'should put cast result to participant', ->
      expectResult = {participants: {myName: 2}}
      cache.put('roomName', {'participants': {myName: null}})
      core.vote('roomName', 'myName', 2)
      cache.get('roomName').should.eql(expectResult)
)