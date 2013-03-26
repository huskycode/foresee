should = require("should")
sinon = require("sinon")

coreModule = require("../src/core")
core = coreModule.core
cache = coreModule.cache

route = require("../src/route").route


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

  it('join points to right template with roomname parameter', () ->
    route.join({
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
         core.addStory.calledOnce.should.be.true
         core.addStory.calledWith(roomName, newStory).should.be.true

         result.should.eql(listResult)
    })
  )
)