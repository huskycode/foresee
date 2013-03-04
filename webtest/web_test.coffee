require("should")
require("../app")

describe("Host Website", () ->
  spawn = require("child_process").spawn
  webdriver = require("selenium-webdriver")
  remote = require("selenium-webdriver/remote")

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


  it('first page should have correct title', (done) ->
    driver.get("http://localhost:3000")
    driver.getTitle().then( (title) ->
       title.should.equal("Foresee")
       done()
    )
  )

  it('first page should have room name and can create when click start now', (done) ->
    driver.get("http://localhost:3000")
    roomIdElement = driver.findElement(webdriver.By.id('id'))
    roomIdElement.sendKeys('RoomName');
    driver.findElement(webdriver.By.id('createRoom')).click()
    driver.getTitle().then( (title) ->
      title.should.equal("Host - RoomName")
    )
    driver.getCurrentUrl().then( (location) ->
      location.should.equal('http://localhost:3000/host/RoomName')
    )
    done()
  )

)
