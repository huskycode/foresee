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
        jq.ajax({
          url: "/join/room/" + page.roomIdValue() + "/name/" + settings.name,
          success: function(data, textStatus, jqXHR) {

            jq.mobile.hidePageLoadingMsg();

            if( data.state.name === 'STARTED' ) {
              page.letVote();
            }else {
              page.waitHost();
            }

          },
          error: function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
            jq.mobile.hidePageLoadingMsg();
          }
        });
    }

    page.waitHost = function(){
      jq.mobile.changePage('#waiting-page', {
        transition: "flip"
      });
    }

    /* Fire after receive `start` msg from server */
    page.letVote = function(){
      jq.mobile.showPageLoadingMsg();
      jq.mobile.changePage('#estimate-page', {
        transition: "flip"
      });
    }

    jq("#add").click(page.joinRoom);

    jq("#name").keyup(function(){
      var value = jq("#name").val();

      if( value ) {
        jq("#add").button('enable');
      }else {
        jq("#add").button('disable');
      }
    });
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
