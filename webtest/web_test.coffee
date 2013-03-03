require("should")
require("../app")

describe("Host Website", () ->   
  spawn = require("child_process").spawn
  webdriver = require("selenium-webdriver")
  remote = require('selenium-webdriver/remote')

  server = null
  driver = null
  
  before( () ->
    server = new remote.SeleniumServer({jar: "webtest/selenium-server-standalone-2.31.0.jar", port:4444})
    server.start()
    driver = new webdriver.Builder().usingServer(server.address()).withCapabilities({'browserName': 'firefox'}).build()
  )

  after( (done) ->
    driver.quit().then( () -> done() ) 
  )

  it('fist page should have correct title', (done) ->
    driver.get("http://localhost:3000")
    driver.getTitle().then( (title) -> 
       title.should.equal("Foresee") 
       done()
    )  
  )

)
