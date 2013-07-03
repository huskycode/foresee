controllers.controller("foresee.moderator.StoryCtrl", function($scope, $http) {
    $scope.storyPile = [];
    $scope.startNowDisable = true;

    $scope.addStory = function() {
        console.log("adsf");
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
