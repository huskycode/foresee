describe("Homepage Test", function() {
    beforeEach(function() {
        browser.get('/');
    });

    it('should have correct title', function() {
        expect(browser.driver.getTitle()).toBe('Foresee');
    });

    it('should go to the host page when enter room name', function() {
        element(by.model('roomName')).sendKeys('RoomABC');
        element(by.id('createRoom')).click();

        expect( browser.getCurrentUrl()).toContain("/#/host/RoomABC");
    });

    it('should stay at same page if no room name is entered', function() {
        element(by.model('roomName')).sendKeys('');
        element(by.id('createRoom')).click();
    });
});