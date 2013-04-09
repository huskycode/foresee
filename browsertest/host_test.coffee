expect = chai.expect
assert = chai.assert

#Mocks Page Object
mockHostPage = {
  startNow: { removeAttr: sinon.stub() }
  addStory: { click: sinon.stub() }
  storyPile: { append: sinon.stub(), empty: sinon.stub() }

  roomId: sinon.stub()
  storyDesc: sinon.stub()
}

#Mock HTTPBackend
mockHTTPBackend = {
  ajax: sinon.stub()

  invokeSuccess: (data) -> @ajax.getCall(0).args[0].success(data, null, null)
}

#Helper Util to act as a browser invoking events
jqUtil = {
  #This will simulate a click by invoking the attached callback
  clickOn: (stubElement) -> stubElement.click.firstCall.args[0]()
}


describe "StoriesCtrl", ->
  storiesCtrl = StoriesCtrl(mockHostPage, mockHTTPBackend)

  describe "AddStory Click", ->
    beforeEach ->
      #Given RoomId and StoryDesc
      mockHostPage.roomId = { val:() -> "roomId" }
      mockHostPage.storyDesc = { val:() -> "storyDesc" }

    it "should call ajax when clicked", ->
      #When addStory is clicked
      jqUtil.clickOn(mockHostPage.addStory)

      #Then httpBackend ajax is called with correct url
      ajaxArgs = mockHTTPBackend.ajax.firstCall.args[0]
      expect(ajaxArgs.url).to.equal("/story/add/room/roomId/story/storyDesc")

    it "should add story to pile when ajax call success", ->
      #When addStory is clicked
      jqUtil.clickOn(mockHostPage.addStory)

      #And backend returns data
      mockHTTPBackend.invokeSuccess(["storyDesc"])

      #Then story pile is cleared and re-added
      assert.isTrue(mockHostPage.storyPile.empty.calledOnce)
      assert.isTrue(mockHostPage.storyPile.append.calledWith("<li>storyDesc</li>"))

      #And start now disabled is removed
      assert.isTrue(mockHostPage.startNow.removeAttr.calledWith("disabled"))

describe "Host", ->
  describe "startNow button", ->
    it "should be call removeAttr('disabled') when storyList is not null", ->
      storyList = {'storyDesc':'anyValue'}
      jq = sinon.stub()
      removeAttrStub = sinon.stub()

      jq.withArgs('#startNow').returns({removeAttr: removeAttrStub })

      enableStartNowButton(jq,storyList)

      assert.isTrue(removeAttrStub.calledWith('disabled'), "removeAttrib was not call")

    it "should not removeAttr('disabled') when storyList is emptyMap", ->
      storyList = {}
      jq = sinon.stub()
      removeAttrStub = sinon.stub()

      jq.withArgs('#startNow').returns({removeAttr: removeAttrStub })

      enableStartNowButton(jq,storyList)

      assert.isFalse(removeAttrStub.calledWith('disabled'), "removeAttrib was call")

