'use strict';

app.factory('Users', [ '$resource', function($resource){
	return $resource('/Umbrella/service/users/:id', null,
	{
		'update': { method:'PUT' }
	});

}]);

