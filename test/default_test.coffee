express = require("express")
index = require("../src/index")
route = index.route
core = index.core
cache = index.cache
should = require("should")
sinon = require("sinon")

describe("route", () ->
  beforeEach( () ->
    sinon.stub core, "addStory"
    sinon.stub core, "listStories"
  )
  
  afterEach( () ->
    core.addStory.restore()
    core.listStories.restore()
  )

  it('index points to right template and contains title', () ->
    route.index(null , {
    render:(filename, params) ->
      filename.should.equal("index.ect")
      params.title.should.equal("Foresee")
    })
  )

  it('host points to right template with roomname parameter', () ->
    route.host({
    params: { id:"bombRoom" },
    headers: { host:"any host" }
    } , {
    render:(filename, params) ->
      filename.should.equal("join.ect")
      params.id.should.equal("bombRoom")
      params.socketUrl.should.equal("http://any host")
    })
  )

  it('story/add calls method in core', () ->
    #Given a room with no stories in it initially 
    cache.clear()

    #Stub return value
    roomName = "someroom"
    newStory = "new story"

    listResult = ["old story", newStory]
    core.listStories.withArgs(roomName).returns( listResult )

    #When route.add is called with roomName, story
    route.addStory({
       params: { "room": roomName, "story": newStory }
    }, {
       send: (result) ->
         #Then ensure that we call core.addStory(...)
         #Then return core.listStories(...) 

         #We test using sinon
         #Take a look at how we stub/restore in beforeEach(), afterEach()
         #Ideally we should be able to stub/restore the whole object, but I 
         #Don't know how to do that yet.
         core.addStory.calledOnce.should.be.true
         core.addStory.calledWith(roomName, newStory).should.be.true
         
         result.should.eql(listResult)
    })
  ) 
)

describe("core", () ->
  it('host add new story and stories list should contain new story.', ->
    result = core.listStories('roomName')
    should.exist(result)
    result.should.eql({})

    core.addStory("roomName", "story1")
    result = core.listStories('roomName')
    should.exist(result)
    result.should.eql({story1: null})
  )
  
  it('add participant should set value in data.', ->
    cache.clear()
    core.addParticipant('roomName', 'myName')
    result = cache.get('roomName')
    should.exist(result)
    (result.myName == null).should.be.true    
  )
  
  it('remove participant should remove specified participant form participant list.', ->
      #given a cache with participant in a room
      cache.put({'roomName': {'participant1':null}})
      #when we call remove on a name
      core.removeParticipant('roomName', 'participant1')
      #then cahche at my name undefined
      result = cache.get('roomName')
      should.exist(result)
      (typeof result.participant1 == 'undefined').should.be.true
  )
  
  describe("getData", -> 
    it("should return blank object when cache is undefined", -> 
        cache.clear()
        core.getData("roomName").should.eql({})
    )
    
    it("should return blank object when cache is null", -> 
        cache.clear()
        cache.put('roomName', null)
        
        core.getData("roomName").should.eql({})
    )
        
    it("should return data when cache has data", -> 
        anyData = {"anyData"}
        
        cache.clear()
        cache.put('roomName', anyData)
        
        core.getData("roomName").should.eql(anyData)    
    )
     
  )
  
  describe("ensureRoomExist", ->
    it('should put blank object into room if cache.get(room) is null.', ->
      cache.clear()
      cache.put('roomName', null)
      
      core.ensureRoomExist('roomName')
      
      cache.get('roomName').should.eql({})
    )
  
    it('should put blank object into room if cache.get(room) is undefined.', ->
      cache.clear()
      
      core.ensureRoomExist('roomName')
      
      cache.get('roomName').should.eql({})
    )
  )

)




