'use strict';

app.factory('Bars', [ '$resource', function($resource){
	return $resource('/Umbrella/service/bars/:id', null,
	{
		'update': { method:'PUT' }
	});

}]);

