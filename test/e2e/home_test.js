var HomePage = function() {
  return {
    URL: '/#/',

    roomNameInput: element(by.model('roomName')),
    createRoomButton: element(by.id('createRoom')),

    get: function () { browser.get(this.URL); },

    setRoomName: function (roomName) { this.roomNameInput.sendKeys(roomName); },
    createRoom: function () { this.createRoomButton.click(); }
  };
};

var HostPage = function(roomName) {
  return {
    URL: '/#/host/' + roomName,
    get: function () { browser.get(this.URL); }


  }
};

jasmine.Matchers.prototype.endsWith = function (expected) {
  return this.actual.indexOf(expected, this.actual.length - expected.length) !== -1
};

describe("HomePage Test", function() {
    var homePage = HomePage()

    beforeEach(function() {
        homePage.get();
    });

    it('should have correct title', function() {
        expect(browser.driver.getTitle()).toBe('Foresee');
    });

    it('should go to the host page when enter room name', function() {
        homePage.setRoomName("RoomABC");
        homePage.createRoom();

        expect( browser.getCurrentUrl()).toContain(HostPage("RoomABC").URL);
    });

    it('should stay at same page if no room name is entered', function() {
        homePage.setRoomName("");
        homePage.createRoom();

        expect( browser.getCurrentUrl()).endsWith(homePage.URL);
    });
});