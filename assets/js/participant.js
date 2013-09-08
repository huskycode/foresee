/**
 * Participant Pages
 */
var ParticipantJoinPage = function(jq, settings) {
    var page = this;

    page.roomIdValue = function() { return jq("#room").val() };
    page.socketUrlValue = function() { return jq("#socketUrl").val() };

    page.getNameValue = function() { return jq("#name").val() };

    page.joinRoom = function() {
        settings.name = page.getNameValue();

        jq.mobile.showPageLoadingMsg();
        return jq.ajax({
          url: "/join/room/" + page.roomIdValue() + "/name/" + settings.name,
          success: function(data, textStatus, jqXHR) {
            jq.mobile.hidePageLoadingMsg();
            return jq.mobile.changePage('#estimate-page', {
              transition: "flip"
            });
          },
          error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
            return jq.mobile.hidePageLoadingMsg();
          }
        });
    }

    jq("#add").click(page.joinRoom);
};

/**
 * Participant States
 */
var ParticipantState = function() {
    this.state = "join";
    this.possibleStates = ["join", "wait", "started"];

    this.to = function(newState) {
        if(!_.contains(this.possibleStates, newState)) {
            throw "Invalid state: " + newState;
        } else {
            this.state = newState;
        }
    }
};
