package page

import geb.Page


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
        link { $("#link") }
        storyDesc { $("input#storyDesc[type='text']") }
        addStory { $("button#addStory") }
        storyPile { $("ul#story-pile") }
        qrCodeImg { $("div#qrcode>img") }
        qrCode { $("div#qrcode") }
        startNow { $("input#startNow[type='button']") }

        findStoryPileOne(wait:true) { $("ul#story-pile>li") }
    }
}

class Client extends Page {
    static content = {
        name { $("#name") }
        nameSubmitBtn { $("#add") }

        voteSelect { $("#vote")  }
        voteFive { $("#vote").find("option[value='5']") }

        voteBtn { $("#voteButton") }

        findFirstCard(wait:true) { $(".card_holder>.card") }
    }
}
