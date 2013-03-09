require("should")
require("../app")

describe("Host Website", () ->
  spawn = require("child_process").spawn
  webdriver = require("selenium-webdriver")
  remote = require("selenium-webdriver/remote")
  FORESEE_BASE_URL = "http://localhost:3000/"

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
    driver.get(FORESEE_BASE_URL)
    driver.getTitle().then( (title) ->
       title.should.equal("Foresee")
       done()
    )
  )

  it('first page should have room name and can create when click start now', (done) ->
    driver.get(FORESEE_BASE_URL)
    driver.findElement(webdriver.By.css("input#id[type='text']")).sendKeys('RoomName');
    driver.findElement(webdriver.By.css("input#createRoom[type='button']")).click()
    driver.getTitle().then( (title) ->
      title.should.equal("Host - RoomName")
    )
    driver.getCurrentUrl().then( (location) ->
      location.should.equal(FORESEE_BASE_URL + 'host/RoomName')
    )
    done()
  )

  it('host page should have input text and button for add new story.', ->
    driver.get(FORESEE_BASE_URL + "host/RoomName")
    driver.findElement(webdriver.By.css("input#storyDesc[type='text']"))
    driver.findElement(webdriver.By.css("button#addStory"))
  )

  it('host page should show story pile', ->
    driver.get(FORESEE_BASE_URL + "host/RoomName")
    driver.findElement(webdriver.By.css("ul#story-pile"))
  )
  
  it('added story should show in story pile.')
    #
    #driver.get(FORESEE_BASE_URL + "host/RoomName")
    #driver.findElement(webdriver.By.css("input#storyDesc[type='text']")).sendKeys('new story description')
    #driver.findElement(webdriver.By.css("button#addStory")).click()
    # need to wait ajax call.
    #driver.findElement(webdriver.By.css("ul#story-pile>li"))
  

  it('added story should show in story pile.', ->
    anyStoryDesc = 'new story description'
    driver.get(FORESEE_BASE_URL + "host/RoomName")
    driver.findElement(webdriver.By.css("input#storyDesc[type='text']")).sendKeys(anyStoryDesc)
    driver.findElement(webdriver.By.css("button#addStory")).click()
    # need to wait ajax call.
    driver.findElement(webdriver.By.css("ul#story-pile>li")).getText().then( (text) ->
      text.should.equal(anyStoryDesc)
    )
  )


  it('host page should generate a visible link', ->
    testRoomName = "RoomName"
    driver.get("#{FORESEE_BASE_URL}host/#{testRoomName}")
    driver.findElement(webdriver.By.id("link")).getText().then( (text) ->
       text.should.equal("#{FORESEE_BASE_URL}join/#{testRoomName}")
    )
  )

)

