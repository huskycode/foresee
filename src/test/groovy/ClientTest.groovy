import geb.Page
import geb.junit4.GebReportingTest
import org.junit.*
import page.Client
import page.HomePage
import page.HostPage
import page.Info


class TestFrame extends Page {
    static def CLIENT1 = "client1"
    static def HOST = "host"

    static url = Info.FORESEE_BASE_URL + "test/frames.html"
    static content = {
        client1 { $("#" + CLIENT1) }
        host { $("#" + HOST) }
    }

    private static def goToUrl(def js, String frame, String url) {
        js.exec "document.getElementById('" + frame + "').src = '" + url + "'"
        Thread.sleep(1000)
    }

    static def setClientOneUrl(def js, String url) {
        goToUrl(js, CLIENT1, url)
    }

    static def setHostUrl(def js, String url) {
        goToUrl(js, HOST, url)
    }
}

class ClientTest extends GebReportingTest {
    @Test
    public void shouldBeAbleToJoinAndTheVoteIsShownOnHostScreen() {
        to TestFrame

        //TestFrame.setHostUrl(js,Info.FORESEE_BASE_URL)

        withFrame(host, HomePage) {
            roomNameTxt().value "RoomName"
            createRoomBtn().click()
        }

        //TestFrame.setClientOneUrl(js,Info.FORESEE_BASE_URL + "join/RoomName")

        withFrame(client1, Client) {
            name().value "UserName1"
            nameSubmitBtn().click()
        }

        withFrame(host, HostPage) {
            //storyDesc().value "new story description"
            //addStory().click()

            startNow().click()
        }

        Thread.sleep(1000)

        withFrame(client1, Client) {
            voteFive().click()

            Thread.sleep(1000)

            voteBtn().click()

            assert findFirstCardFace().text() == "5"
            assert findFirstCardName().text() == "UserName1"
        }

        Thread.sleep(1000)

        withFrame(host, HostPage) {
            assert findFirstCardFace().text() == "5"
            assert findFirstCardName().text() == "UserName1"
        }
    }

    @Test
    public void "shoud show participant name on host screen when they joined"() {
        to TestFrame

        //TestFrame.setHostUrl(js,Info.FORESEE_BASE_URL)

        withFrame(host, HomePage) {
            roomNameTxt().value "RoomName"
            createRoomBtn().click()
        }

        //TestFrame.setClientOneUrl(js,Info.FORESEE_BASE_URL + "join/RoomName")

        withFrame(client1, Client) {
            name().value "UserName1"
            nameSubmitBtn().click()
        }

        withFrame(host, HomePage) {
            Thread.sleep(1000)
            assert findParticipantOne().text().contains("UserName1")
        }
    }

}
