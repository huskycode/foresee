// Generated by CoffeeScript 1.4.0
var assert, expect, jqUtil, mockHTTPBackend, mockHostPage;

expect = chai.expect;

assert = chai.assert;

mockHostPage = {
  startNow: {
    removeAttr: sinon.stub()
  },
  addStory: {
    click: sinon.stub()
  },
  storyPile: {
    append: sinon.stub(),
    empty: sinon.stub()
  },
  roomId: sinon.stub(),
  storyDesc: sinon.stub()
};

mockHTTPBackend = {
  ajax: sinon.stub(),
  invokeSuccess: function(data) {
    return this.ajax.getCall(0).args[0].success(data, null, null);
  }
};

jqUtil = {
  clickOn: function(stubElement) {
    return stubElement.click.firstCall.args[0]();
  }
};

describe("StoriesCtrl", function() {
  var storiesCtrl;
  storiesCtrl = StoriesCtrl(mockHostPage, mockHTTPBackend);
  return describe("AddStory Click", function() {
    beforeEach(function() {
      mockHostPage.roomId = {
        val: function() {
          return "roomId";
        }
      };
      return mockHostPage.storyDesc = {
        val: function() {
          return "storyDesc";
        }
      };
    });
    it("should call ajax when clicked", function() {
      var ajaxArgs;
      jqUtil.clickOn(mockHostPage.addStory);
      ajaxArgs = mockHTTPBackend.ajax.firstCall.args[0];
      return expect(ajaxArgs.url).to.equal("/story/add/room/roomId/story/storyDesc");
    });
    return it("should add story to pile when ajax call success", function() {
      jqUtil.clickOn(mockHostPage.addStory);
      mockHTTPBackend.invokeSuccess({
        "storyDesc": ""
      });
      assert.isTrue(mockHostPage.storyPile.empty.calledOnce);
      assert.isTrue(mockHostPage.storyPile.append.calledWith("<li>storyDesc</li>"));
      return assert.isTrue(mockHostPage.startNow.removeAttr.calledWith("disabled"));
    });
  });
});

describe("Host", function() {
  return describe("startNow button", function() {
    it("should be call removeAttr('disabled') when storyList is not null", function() {
      var jq, removeAttrStub, storyList;
      storyList = {
        'storyDesc': 'anyValue'
      };
      jq = sinon.stub();
      removeAttrStub = sinon.stub();
      jq.withArgs('#startNow').returns({
        removeAttr: removeAttrStub
      });
      enableStartNowButton(jq, storyList);
      return assert.isTrue(removeAttrStub.calledWith('disabled'), "removeAttrib was not call");
    });
    return it("should not removeAttr('disabled') when storyList is emptyMap", function() {
      var jq, removeAttrStub, storyList;
      storyList = {};
      jq = sinon.stub();
      removeAttrStub = sinon.stub();
      jq.withArgs('#startNow').returns({
        removeAttr: removeAttrStub
      });
      enableStartNowButton(jq, storyList);
      return assert.isFalse(removeAttrStub.calledWith('disabled'), "removeAttrib was call");
    });
  });
});