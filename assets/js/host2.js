app.controller("foresee.moderator.StoryCtrl", function($scope, $http) {
    $scope.storyPile = [];

    function _onSuccess(data) {
      var dataList = Object.keys(data)
      $scope.storyPile = dataList;
    }

    function _onError(data, status) {
       alert(status);
    }

    $scope.init = function(roomName) {
        $http.get("/stories/" + roomName)
              .success(_onSuccess)
              .error(_onError);
    }

    $scope.addStory = function() {
        $http.get("/story/add/room/" + $scope.roomId + "/story/" + $scope.storyDesc)
              .success(_onSuccess)
              .error(_onError);
    }
});

app.controller("foresee.moderator.ParticipantListCtrl", function($scope, webSocket) {
  $scope.participants = [];
  $scope.roomName = "";

  webSocket.on('voteRefresh', function(data) {
    if(data.room == $scope.roomName) {
      $scope.participants = _.keys(data.votes);
    }
  });

  $scope.init = function (roomName) {
    $scope.roomName = roomName;
    webSocket.emit("subscribe", { room: roomName });
  };

  $scope.removeParticipant = function(name) {
    $scope.participants = _.without($scope.participants, name);
    webSocket.emit("removeParticipant", {
      "room": $scope.roomName,
      "name": name
    })
  }
});


app.controller("foresee.moderator.CardCtrl", function($scope, webSocket) {
  $scope.participantCards = [];

  webSocket.on('voteRefresh', function(data) {
    var cards = $scope.displayChar($scope.convertToCard(data));
    $scope.participantCards = cards;
  });

  $scope.init = function(roomName) {
    webSocket.emit("subscribe", { room: roomName });
  };

  $scope.convertToCard = function(voteRefreshData) {
    var votesData = voteRefreshData.votes;
    return _.map(votesData, function(value, key){ return {"name": key, "score": value}});
  }

  $scope.displayChar = function(votesData) {
    var isAllVoted = _.every(votesData, function (value) {
      return value.score != null;
    });

    return _.map(votesData, function(value) {

        var displayScore = value.score;
        if (displayScore == null) {
          displayScore = "-" ;
        } else if(!isAllVoted) {
          displayScore = "?";
        };

        return {"name": value.name , "score": displayScore};
    });
  }
});

app.directive('qrcode', function() {
  return {
      restrict: 'A',
      scope: {
          url: '='
      },
      link: function (scope, elem, attrs) {
        new QRCode(elem[0].id, scope.url);
      }
  }
});
