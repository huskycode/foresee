express = require("express")
route = require("../src/index").route
core = require("../src/index").core
should = require("should")

describe("route", () ->
  it('should have title', () ->
    route.index(null , {
    render:(filename, params) ->
      filename.should.equal("index.ect")
      params.title.should.equal("Foresee")
    })
  )

  it('pass roomname parameter to render', () ->
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
  it('pass story name.')
    #Note: Empty it(..) indicates pending tests :-)
    #core.addStory("bombRoom", "As a <role>, I want <goal/desire> so that <benefit>")
)
