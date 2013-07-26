app.controller("foresee.moderator.StoryCtrl", function($scope, $http) {
    $scope.storyPile = [];
    $scope.startNowDisable = true;

    $scope.addStory = function() {
        $http.get("/story/add/room/" + $scope.roomId + "/story/" + $scope.storyDesc)
              . success(function(data, status, headers, config) {
                var dataList = Object.keys(data)
                if (dataList.length > 0) {
                  $scope.startNowDisable = false
                }
                $scope.storyPile = dataList;
              }).
              error(function(data, status, headers, config) {
                alert(status)
              });
    }
});

app.controller("foresee.moderator.ParticipantListCtrl", function($scope, webSocket) {
  $scope.participants = [];

  webSocket.on('voteRefresh', function(data) {
    var participantNames = _.keys(data.votes);
    $scope.participants = participantNames;
  });
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