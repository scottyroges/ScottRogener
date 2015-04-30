'use strict';

app.factory('Categories', [ '$resource', function($resource){
	return $resource('/Umbrella/service/categories/:id', null,
	{
		'update': { method:'PUT' }
	});

}]);

