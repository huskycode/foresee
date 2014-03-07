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
        });;

    $locationProvider.html5Mode(false);
});

app.controller("foresee.page.HostController", function($scope, $http, $routeParams) {
    $scope.roomId = $routeParams.roomId;

    $http.get('/url').success(function(data, status, headers, config) {
        $scope.url = data.url;
    });
});

