import geb.junit4.GebReportingTest
import org.junit.*
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

class NewHostPage extends HostPage {
    static TEST_ROOM_NAME = "RoomNameNew"
    static url = Info.FORESEE_BASE_URL + "host/" + TEST_ROOM_NAME
    static at = { title == ("Host - " + TEST_ROOM_NAME) }
}


class HostPageTest extends GebReportingTest {
    //@Test
    //public void shouldHaveStoryElements() {
        //to TestHostPage

        //assert storyDesc() != null
        //assert addStory() != null
        //assert storyPile() != null
    //}

    @Test
    public void shouldGenerateAVisibleLink() {
        to TestHostPage

        assert link().@href.endsWith("join/" + TestHostPage.TEST_ROOM_NAME) == true
    }

    @Test
    public void shouldShowQRCodeForCurrentRoom() {
        to TestHostPage

        assert qrCode().@title.endsWith("join/" + TestHostPage.TEST_ROOM_NAME) == true
    }

    @Test
    public void shouldShowStartNowButtonAsEnable() {
        to NewHostPage

        assert !startNow().@disabled
    }

    @Test
    public void shouldDisableStartNowButtonAfterClicking() {
        to NewHostPage

        startNow().click();

        assert startNow().@disabled
    }

    //@Test
    //public void shouldShowNewStoryInPileWhenAddedAndEnableStartNowButton() {
        //to TestHostPage

        //storyDesc().value "new story description"
        //addStory().click()

        //assert findStoryPileOne().text() == "new story description"
        //assert !startNow().@disabled
    //}

    //@Test
    //public void shouldShowTheExistingStoryIfRefreshed() {
        ////
        //// Needs to execute "shouldShowNewStoryInPileWhenAddedAndEnableStartNowButton" first
        ////
        //to TestHostPage

        //assert findStoryPileOne().text() == "new story description", "Cannot find first story"
        //assert !startNow().@disabled, "Start now button is not enabled"
    //}
}
