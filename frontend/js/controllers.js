app.controller("foresee.moderator.LoginCtrl", function($scope, $location) {
    $scope.roomName = "";

    $scope.createRoom = function() {
        if (validateRoomName($scope.roomName)) {
            $location.path("host/" + encodeURIComponent($scope.roomName));
            $scope.modMsg = "";
        } else {
            $scope.modMsg = ("room name must not blank.");
        }
    }

    function validateRoomName(roomName) {
        if (roomName === "") {
            return false;
        } else {
            return true;
        }
    };
});

app.controller("foresee.moderator.StoryCtrl", function($scope, $http) {
    $scope.storyPile = [];
    $scope.roomId = $scope.$parent.roomId;

    $http.get("/stories/" + $scope.roomId)
        .success(_onSuccess)
        .error(_onError);


    function _onSuccess(data) {
        var dataList = Object.keys(data)
        $scope.storyPile = dataList;
    }

    function _onError(data, status) {
        alert(status);
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
    var roomId = $scope.$parent.roomId;
    $scope.participantCards = [];

    webSocket.emit("subscribe", { room: roomId });


    webSocket.on('voteRefresh', function(data) {
        var cards = $scope.displayChar($scope.convertToCard(data));
        $scope.participantCards = cards;
    });
    webSocket.emit("ask", { room: roomId });

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


app.controller("foresee.participant.JoinCtrl", function($scope, $location) {
    $scope.participantName = '';

    $scope.joinRoom = function() {
        $location.path("join/" + encodeURIComponent($scope.$parent.roomId) + "/" + $scope.participantName);
    }
});

app.controller("foresee.participant.VoteCtrl", function($scope, webSocket) {
    $scope.score = 1;
    $scope.options = [1,2,3,4,5];

    $scope.vote = function() {
        var data = {
            room: $scope.$parent.roomId,
            name: $scope.$parent.participantName,
            vote: $scope.score
        };
        webSocket.emit("vote", data);
    }
});