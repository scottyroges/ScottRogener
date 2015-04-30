'use strict';

app.controller('ProjectCtrl', ['$scope', '$window', function ($scope, $window) {
	$scope.projects = [{
		title : 'Reddit Headlines',
		description : 'Pulls in Reddit RSS feed to show top 25 post on Reddit',
		git : 'true',
		link : 'RedditHeadlines'
	},
	{
		title : '41Thieves',
		description : 'My version of the solitaire game 40 thieves, written in plain javascript',
		git : 'true',
		link : '41Thieves'
	},
	{
		title : 'Umbrella',
		description: 'Work in Progress',
		git : false,
		link : 'Umbrella'
	}];

	$scope.goToProject = function(index){
		console.log($scope.projects[index].title);
		$window.location = $scope.projects[index].link;
	}
}]);
