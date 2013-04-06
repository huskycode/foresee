process.env.PORT = 3001

should = require("should")
require("../app")

spawn = require("child_process").spawn
webdriver = require("selenium-webdriver")
remote = require("selenium-webdriver/remote")
FORESEE_BASE_URL = "http://localhost:3001/"

# Page Objects
# ============
# Adapted from Java version
# @see https://code.google.com/p/selenium/wiki/PageObjects
# 
# Please note that 
# 1. element existence is checked when objects are created automatically 
HomePage = (driver) -> 
  driver.getCurrentUrl().then( (location) -> location.should.equal(FORESEE_BASE_URL) )
  return {
    #Page Elements
    title: driver.getTitle()
    roomName: driver.findElement(webdriver.By.css("input#id[type='text']"))
    createRoom: driver.findElement(webdriver.By.css("input#createRoom[type='button']"))

    #Actions
    typeRoomName: (name) -> @roomName.sendKeys(name)
    clickCreateRoom: () -> @createRoom.click(); return HostPage(driver);
    clickCreateRoomExpectingNothingHappens: () -> @createRoom.click(); return HomePage(driver);
  }

HostPage = (driver) -> 
  return {
    url: driver.getCurrentUrl()
    title: driver.getTitle()

    link: driver.findElement(webdriver.By.id("link"))
    storyDesc: driver.findElement(webdriver.By.css("input#storyDesc[type='text']"))
    addStory: driver.findElement(webdriver.By.css("button#addStory"))
    storyPile: driver.findElement(webdriver.By.css("ul#story-pile"))


    qrCodeImg: driver.findElement(webdriver.By.css("div#qrcode>img"))
    qrCode: driver.findElement(webdriver.By.css("div#qrcode"))

    startNow: driver.findElement(webdriver.By.css("input#startNow[type='button']"))

    typeStoryDesc: (desc) -> @storyDesc.sendKeys(desc)
    clickAddStory: () -> @addStory.click()
    findStoryPileOne: () -> driver.findElement(webdriver.By.css("ul#story-pile>li"))
  }

navigation = (driver) -> {
  toHomePage: () -> driver.get(FORESEE_BASE_URL); return HomePage(driver);
  toHostPage: (roomName) -> driver.get(FORESEE_BASE_URL + "host/RoomName"); return HostPage(driver);
}

# Tests
describe("Host Website", () ->
  server = null
  driver = null
  nav = null

  before( () ->
    server = new remote.SeleniumServer({jar: "webtest/selenium-server-standalone-2.31.0.jar", port:4444})
    server.start()
    driver = new webdriver.Builder()
      .usingServer(server.address())
      .withCapabilities({'browserName': 'firefox'}).build()
    nav = navigation(driver)
  )

  after( (done) ->
    driver.quit().then( () -> done() )
  )

  describe "Home Page", ->
    it 'should have correct title', (done) ->
      homePage = nav.toHomePage() 
      homePage.title
        .then( (title) ->
           title.should.equal("Foresee")
           done()
        )

    it 'should have room name and can create when click start now', (done) ->
      homePage = nav.toHomePage()
      homePage.typeRoomName("RoomName")
      hostPage = homePage.clickCreateRoom()

      hostPage.url.then( (location) -> location.should.equal(FORESEE_BASE_URL + 'host/RoomName') )
      hostPage.title.then( (title) -> title.should.equal("Host - RoomName"); done(); )

    it 'should stay at the same page if no room name is entered', (done) ->
      homePage = nav.toHomePage() 
      homePage.typeRoomName("")
      homePage = homePage.clickCreateRoomExpectingNothingHappens()
      homePage.title.then( (title) -> title.should.equal("Foresee"); done(); )

  describe "Host Page", ->
    it 'should have input text and button for add new story.', (done) ->
      hostPage = nav.toHostPage("RoomName")
      hostPage.addStory.then( (element) -> done() )

    it 'should show story pile', (done) ->
      hostPage = nav.toHostPage("RoomName")
      hostPage.storyPile.then( (element) -> done() )

    it 'should generate a visible link', (done) ->
      hostPage = nav.toHostPage("RoomName")
      hostPage.link.getText().then( (text) -> 
         text.should.equal("#{FORESEE_BASE_URL}join/RoomName")
         done()  
      )

    it "should show QRCode for current room.", (done) ->
      testRoomName = "RoomName"
      hostUrl = "#{FORESEE_BASE_URL}host/#{testRoomName}"
      joinUrl = "#{FORESEE_BASE_URL}join/#{testRoomName}"
      
      hostPage = nav.toHostPage("RoomName")
      hostPage.qrCode.then( (qrCode) -> 
        qrCode.getAttribute('title').then( (val) -> val.should.eql(joinUrl); done();  ) 
      )

    it "should show 'Start Now' button as disabled", (done) ->
      testRoomName = "RoomName"
      hostUrl = "#{FORESEE_BASE_URL}host/#{testRoomName}"
      
      hostPage = nav.toHostPage(testRoomName)
      hostPage.startNow.getAttribute('disabled').then( (value) -> 
        value.should.eql("true"); 
        done(); 
      )

    it 'should show new story in story pile when added and startNow is enabled', (done) ->
      anyStoryDesc = 'new story description'

      hostPage = nav.toHostPage("RoomName")
      hostPage.typeStoryDesc(anyStoryDesc)
      hostPage.clickAddStory()

      # need to wait ajax call.
      hostPage.findStoryPileOne().getText().then( (text) -> text.should.equal(anyStoryDesc) )
      hostPage.startNow.getAttribute('disabled').then( (value) -> 
        should.not.exist(value); done(); 
      )

    #This test is currently not necessary - as we have no way to remove 
    #any stories yet.
    it "'Start Now' button should disable when no story"
)

