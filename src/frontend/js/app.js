var app = angular.module("foresee", ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html'
            //controller  : 'mainController'
        })
        .when('/host/:roomId', {
            templateUrl : 'pages/host.html',
            controller  : 'foresee.page.HostController'
        })
        .when('/join/:roomId', {
            templateUrl : 'pages/join.html',
            controller  : 'foresee.page.JoinController'
        })
        .when('/join/:roomId/:participantName', {
            templateUrl : 'pages/vote.html',
            controller  : 'foresee.page.VoteController'
        });

    $locationProvider.html5Mode(false);
});

app.controller("foresee.page.HostController", function($scope, $http, $routeParams) {
    $scope.roomId = $routeParams.roomId;

    $http.get('/url').success(function(data, status, headers, config) {
        $scope.url = data.url;
    });
});

app.controller("foresee.page.JoinController", function($scope, $routeParams) {
    $scope.roomId = $routeParams.roomId;
});

app.controller("foresee.page.VoteController", function($scope, $routeParams, webSocket) {
    $scope.roomId = $routeParams.roomId;
    $scope.participantName = $routeParams.participantName;

    webSocket.emit("join", {"room": $scope.roomId, "name": $scope.participantName});
});



