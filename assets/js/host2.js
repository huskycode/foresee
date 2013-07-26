app.controller("foresee.moderator.StoryCtrl", function($scope, $http) {
    $scope.storyPile = [];
    $scope.startNowDisable = true;

    $scope.addStory = function() {
        $http.get("/story/add/room/" + $scope.roomId + "/story/" + $scope.storyDesc)
              . success(function(data) {
                var dataList = Object.keys(data)
                if (dataList.length > 0) {
                  $scope.startNowDisable = false
                }
                $scope.storyPile = dataList;
              }).
              error(function(data, status) {
                alert(status)
              });
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
  };

  $scope.removeParticipant = function(name) {
    $scope.participants = _.without($scope.participants, name);
    webSocket.emit("removeParticipant", {
      "room": $scope.roomName,
      "name": name
    })
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