'use strict';

app.controller('NavbarCtrl',['$scope', '$location' ,function($scope, $location){
	$scope.menu = [{
		title : 'Projects',
		link : '/'
	},{
		title : 'About',
		link : '/About'
	},{
		title : 'Contact',
		link : '/Contact'
	}];

	$scope.isActive = function(route) {
      return route === $location.path();
    };
}]);