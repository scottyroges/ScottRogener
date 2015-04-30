'use strict';

app.controller('TopLevelCtrl', ['$scope','AuthenticatedService', function($scope, AuthenticatedService){
    $scope.top = {};
    AuthenticatedService.isAuthenticated()
        .success(function (data) {
            $scope.top.profile = data;
        })
        .error(function () {
            $scope.top.profile = {};
        })
}]);
