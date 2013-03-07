express = require("express")
route = require("../src/index").route
core = require("../src/index").core
should = require("should")

describe("route", () ->
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
)




