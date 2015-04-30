'use strict';

app.factory('Checkins', [ '$resource', function($resource){
    return $resource('/Umbrella/service/checkins/:id', null,
        {
            'update': { method:'PUT' }
        });

}]);
