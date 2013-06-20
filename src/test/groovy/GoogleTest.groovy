import geb.*
import geb.junit4.*
import org.junit.Test

import org.junit.runner.RunWith
import org.junit.runners.JUnit4

class GoogleHomePage extends Page {
    static url = "http://google.com/ncr"
    static at = { title == "Google" }
}

class GoogleResultsPage extends Page {
    static at = { results }
    static content = {
        results(wait: true) { $("li.g") }
        result { i -> results[i] }
        resultLink { i -> result(i).find("a.l")[0] }
        firstResultLink { resultLink(0) }
    }
}

@RunWith(JUnit4)
class GoogleTest extends GebReportingTest {

    @Test
    void theFirstLinkShouldBeWikipedia() {
        to GoogleHomePage

        // enter wikipedia into the search field
        q = "wikipedia"

        // wait for the change to results page to happen
        // (google updates the page without a new request)
        at GoogleResultsPage

        // is the first link to wikipedia?
        firstResultLink.text() == "Wikipedia"

        // click the link
        firstResultLink.click()

        waitFor { at WikipediaPage }
    }

}