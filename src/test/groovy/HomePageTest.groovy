import geb.*
import geb.junit4.*
import org.junit.*

import org.junit.runner.RunWith
import org.junit.runners.JUnit4

import static Info.*

class Info {
   static def FORESEE_BASE_URL = "http://localhost:3001/";
}

class HomePage extends Page {
    static url = FORESEE_BASE_URL;
    static at = { title == "Foresee" }
    static content = {
        roomNameTxt { $("#id") }
        createRoomBtn { $("#createRoom") }
    }
}

class HostPage extends Page {
    static at = { title.startsWith("Host - ") }
    static content = {
    }
}

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