import geb.*
import geb.junit4.*
import org.junit.*

import org.junit.runner.RunWith
import org.junit.runners.JUnit4
import page.HomePage
import page.HostPage


@RunWith(JUnit4)
class HomePageTest extends GebReportingTest {

    @Test
    void shouldHaveCorrectTitle() {
        to HomePage
        assert at(HomePage)
    }

    @Test
    void shouldCreateRoomWhenClickStartNowWithRoomName() {
        to HomePage
        roomNameTxt().value "RoomName"
        createRoomBtn().click()

        at HostPage
        assert title == "Host - RoomName"
    }

    @Test
    void shouldStayAtSamePageIfNoRoomNameIsEntered() {
        to HomePage
        roomNameTxt().value ""
        createRoomBtn().click()

        assert at(HomePage)
    }
}