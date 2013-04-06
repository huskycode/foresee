process.env.PORT = 3001

should = require("should")
require("../app")

describe("Host Website", () ->
  spawn = require("child_process").spawn
  webdriver = require("selenium-webdriver")
  remote = require("selenium-webdriver/remote")
  FORESEE_BASE_URL = "http://localhost:3001/"

  server = null
  driver = null

  before( () ->
    server = new remote.SeleniumServer({jar: "webtest/selenium-server-standalone-2.31.0.jar", port:4444})
    server.start()
    driver = new webdriver.Builder()
      .usingServer(server.address())
      .withCapabilities({'browserName': 'firefox'}).build()
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
      done()
    )
  )

  it('Create a room with blank room name will nothing happen', (done) ->
    blankRoomName = ''
    driver.get(FORESEE_BASE_URL)
    driver.findElement(webdriver.By.css("input#id[type='text']")).sendKeys(blankRoomName);
    driver.findElement(webdriver.By.css("input#createRoom[type='button']")).click()
    driver.getTitle().then( (title) ->
      title.should.equal("Foresee")
    )
    driver.getCurrentUrl().then( (location) ->
      location.should.equal(FORESEE_BASE_URL)
      done()
    )
  )

  it('host page should have input text and button for add new story.', (done) ->
    driver.get(FORESEE_BASE_URL + "host/RoomName")
    driver.findElement(webdriver.By.css("input#storyDesc[type='text']"))
    driver.findElement(webdriver.By.css("button#addStory"))
    .then( (element) ->
      done()
    )
  )

  it('host page should show story pile', (done) ->
    driver.get(FORESEE_BASE_URL + "host/RoomName")
    driver.findElement(webdriver.By.css("ul#story-pile"))
    .then( (element) ->
      done()
    )
  )

  it('added story should show in story pile.', (done) ->
    anyStoryDesc = 'new story description'
    driver.get(FORESEE_BASE_URL + "host/RoomName")
    driver.findElement(webdriver.By.css("input#storyDesc[type='text']")).sendKeys(anyStoryDesc)
    driver.findElement(webdriver.By.css("button#addStory")).click()
    # need to wait ajax call.
    driver.findElement(webdriver.By.css("ul#story-pile>li")).getText()
    .then( (text) ->
      text.should.equal(anyStoryDesc)
      done()
    )
  )

  it('host page should generate a visible link', (done) ->
    testRoomName = "RoomName"
    driver.get("#{FORESEE_BASE_URL}host/#{testRoomName}")
    driver.findElement(webdriver.By.id("link")).getText()
    .then( (text) ->
       text.should.equal("#{FORESEE_BASE_URL}join/#{testRoomName}")
       done()
    )
  )

  it "host page should show QRCode for current room.", (done) ->
    testRoomName = "RoomName"
    hostUrl = "#{FORESEE_BASE_URL}host/#{testRoomName}"
    joinUrl = "#{FORESEE_BASE_URL}join/#{testRoomName}"
    driver.get(hostUrl)
    driver.findElement(webdriver.By.css("div#qrcode>img"))
    driver.findElement(webdriver.By.css("div#qrcode[title='#{joinUrl}']"))
    .then( (element) ->
      done()
    )

  it "first time access host page 'Start Now' button should disable", (done) ->
    testRoomName = "RoomName"
    hostUrl = "#{FORESEE_BASE_URL}host/#{testRoomName}"
    driver.get(hostUrl)
    driver.findElement(webdriver.By.css("input#startNow[type='button']"))
    driver.findElement(webdriver.By.css("input#startNow[disabled='disabled']"))
    .then( (element) ->
      done()
    )

  it "'Start Now' button should disable when no story"

  it "'Start Now' button should enable when have story", (done) ->
    testRoomName = "RoomName"
    anyStoryDesc = 'new story description'
    hostUrl = "#{FORESEE_BASE_URL}host/#{testRoomName}"
    driver.get(hostUrl)
    driver.findElement(webdriver.By.css("input#storyDesc[type='text']")).sendKeys(anyStoryDesc)
    driver.findElement(webdriver.By.css("button#addStory")).click()
    driver.findElement(webdriver.By.css("ul#story-pile>li")).getText().then( (text) ->
      text.should.equal(anyStoryDesc)
    )
    driver.findElement(webdriver.By.css("input#startNow")).then( (startNowBtn) ->
      startNowBtn.getAttribute('disabled').then( (val) ->
        should.not.exist(val)
        done()
      )
    )

)

