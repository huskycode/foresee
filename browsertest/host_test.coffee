expect = chai.expect
assert = chai.assert

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

