'use strict';

app.controller('ContactCtrl', ['$scope','$http', function($scope, $http){
	$scope.sendMessage = function(){
		$http.post('/service/contactme', $scope.form).success(function(){
			console.log("message sent");
		}).error(function(){
			console.log("message not sent");
		});
	}
}]);