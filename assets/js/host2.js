app.controller("foresee.moderator.StoryCtrl", function($scope, $http) {
    $scope.storyPile = [];
    $scope.startNowDisable = true;

    function _onSuccess(data) {
      var dataList = Object.keys(data)
      if (dataList.length > 0) {
        $scope.startNowDisable = false;
      }
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
  $scope.participantCards = [{"name":"mrA","score":2},{"name":"mrB","score":3},{"name":"mrC","score":"?"}];


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