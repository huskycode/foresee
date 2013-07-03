import geb.junit4.GebReportingTest
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.JUnit4
import page.HostPage
import page.Info

@RunWith(JUnit4.class)

class TestHostPage extends HostPage {
    static TEST_ROOM_NAME = "RoomName"
    static url = Info.FORESEE_BASE_URL + "host/" + TEST_ROOM_NAME
    static at = { title == ("Host - " + TEST_ROOM_NAME) }
}

class HostPageTest extends GebReportingTest {
    @Test
    public void shouldHaveStoryElements() {
        to TestHostPage

        assert storyDesc() != null
        assert addStory() != null
        assert storyPile() != null
    }

    @Test
    public void shouldGenerateAVisibleLink() {
        to TestHostPage

        assert link().@href == Info.FORESEE_BASE_URL + "join/" + TestHostPage.TEST_ROOM_NAME
    }

    @Test
    public void shouldShowQRCodeForCurrentRoom() {
        to TestHostPage

        assert qrCode().@title == Info.FORESEE_BASE_URL + "join/" + TestHostPage.TEST_ROOM_NAME
    }

    @Test
    public void shouldShowStartNowButtonAsDisabled() {
        to TestHostPage

        assert startNow().@disabled
    }

    @Test
    public void shouldShowNewStoryInPileWhenAddedAndEnableStartNowButton() {
        to TestHostPage

        storyDesc().value "new story description"
        addStory().click()

        assert findStoryPileOne().text() == "new story description"
        assert !startNow().@disabled
    }
}
