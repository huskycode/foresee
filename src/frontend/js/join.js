var countVoted, getCardFace, populateCards, roomId, socket, socketUrl;

roomId = null;

socketUrl = null;

socket = null;

getCardFace = function(displayNumbers, val) {
  if (val === null) {
    return "-";
  } else if (displayNumbers) {
    return val;
  } else {
    return "?";
  }
};

countVoted = function(votes) {
  var n, names, total, _i, _len;
  names = Object.keys(votes);
  total = 0;
  for (_i = 0, _len = names.length; _i < _len; _i++) {
    n = names[_i];
    if (votes[n] !== null) {
      total++;
    }
  }
  return total;
};

populateCards = function(votes) {
  var blockClass, blocks, displayNumbers, index, n, names, namesCount, result, votedCount, _i, _len;
  names = Object.keys(votes);
  namesCount = names.length;
  votedCount = countVoted(votes);
  displayNumbers = namesCount === votedCount;
  blocks = ["ui-block-a", "ui-block-b", "ui-block-c"];
  result = "";
  for (index = _i = 0, _len = names.length; _i < _len; index = ++_i) {
    n = names[index];
    blockClass = blocks[index % 3];
    result += "<div class='" + blockClass + "'><div class='card_holder'><div class='card'>" + getCardFace(displayNumbers, votes[n]) + "</div><div class='name'>" + n + "</div></div></div>";
  }
  return $("#cards").html(result).trigger("create");
};

var settings = {
  name: null
};

$('#login-page').live('pagecreate', function() {
  var joinPage = new ParticipantJoinPage($, settings);

  roomId = joinPage.roomIdValue();
  socketUrl = joinPage.socketUrlValue();

  socket = io.connect(socketUrl);
  socket.emit("subscribe", { room: roomId });

  socket.on("voteRefresh", function(data) {
    if (data.room === roomId) {
      if (settings.name !== null && data.votes[settings.name] === void 0) {
        return $.mobile.changePage('#login-page', {
          transition: "flip"
        });
      } else {
        return populateCards(data.votes);
      }
    }
  });

  socket.on("startRoom", function(data) {
      joinPage.letVote();
      console.log('estimate');
  });
});

$('#estimate-page').live('pagecreate', function(e) {
  return $("#voteButton").click(function(e) {
    socket.emit("vote", {
      room: roomId,
      name: settings.name,
      vote: $("#vote").val()
    });
    return $.mobile.changePage('#result-page', {
      transition: "slide"
    });
  });
});
