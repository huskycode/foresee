should = require("should")

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
    createRoom: driver.findElement(webdriver.By.css("button#createRoom"))

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


TestFrames = (driver) ->
  hostFrame = driver.findElement(webdriver.By.id("host"))
  client1 = driver.findElement(webdriver.By.id("client1"))

  #Shared Function
  executeInFrame = (frame, callBack) ->
    driver.switchTo().frame(frame)
    callBack()
    driver.switchTo().defaultContent()
  navigateToUrl = (frameId, url) ->
    driver.executeScript("document.getElementById('#{frameId}').src = '#{url}'")

  #Prepare Frame
  driver.executeScript("document.getElementById('host').src = '#{FORESEE_BASE_URL}'")

  return {
    hostFrame: hostFrame
    client1: client1

    executeInHostFrame: (callBack) -> executeInFrame(hostFrame, callBack)
    executeInClientOneFrame: (callBack) -> executeInFrame(client1, callBack)
    setClientOneUrl: (url) -> navigateToUrl("client1", url)
  }


navigation = (driver) -> {
  toHomePage: () -> driver.get(FORESEE_BASE_URL); return HomePage(driver);
  toHostPage: (roomName) -> driver.get(FORESEE_BASE_URL + "host/RoomName"); return HostPage(driver);

  toTestFrame: () -> driver.get(FORESEE_BASE_URL + "test/frames.html"); return TestFrames(driver);
}

# Tests
describe("Host Website", () ->
  server = null
  driver = null
  nav = null

  before( () ->
    process.env.PORT = 3001
    require("../../app")

    server = new remote.SeleniumServer({jar: "test/webtest/selenium-server-standalone-2.31.0.jar", port:4444})
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
      driver.sleep(2000)

      hostPage.findStoryPileOne().getText().then( (text) -> text.should.equal(anyStoryDesc) )
      hostPage.startNow.getAttribute('disabled').then( (value) ->
        should.not.exist(value); done();
      )

    #This test is currently not necessary - as we have no way to remove
    #any stories yet.
    it "'Start Now' button should disable when no story"

  describe "Client", ->
    it 'should be able to join a room and their vote is displayed on host screen', (done) ->
      frame = nav.toTestFrame()
      frame.executeInHostFrame( () ->
        homePage = HomePage(driver)
        homePage.typeRoomName("RoomName")
        hostPage = homePage.clickCreateRoom()
      )
      frame.setClientOneUrl("#{FORESEE_BASE_URL}join/" + "RoomName")

      #TODO: Is there a waitForElement(...) method in WebDriverJS?
      driver.sleep(1000) #Sleeps for the client to load

      frame.executeInClientOneFrame( () ->
        #TODO: Refactor this part into PageObject patterns
        driver.findElement(webdriver.By.id("name")).sendKeys("UserName1")
        driver.findElement(webdriver.By.id("add")).click()

        #TODO: Find a way to select some combobox in WebDriverJS
        #asked StackOverflow http://stackoverflow.com/questions/15859143/selecting-dropdown-in-webdriverjs
        #webdriver.Select(driver.findElement(webdriver.By.id("vote"))).selectByValue("5")

        driver.sleep(1000) #Sleeps for transition
        select = driver.findElement(webdriver.By.id("vote"))
        select.findElement(webdriver.By.css("option[value='5']")).click()

        driver.sleep(1000) #Sleeps for transition

        driver.findElement(webdriver.By.id("voteButton")).click()

        driver.findElements(webdriver.By.css(".card_holder>.card")).then( (elements) ->
          elements.length.should.eql(1)
          elements[0].getText().then( (text) -> text.should.eql("5"); done(); )
        )
      )
)

