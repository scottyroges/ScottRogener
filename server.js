var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.configure(function(){
	app.use('/RedditHeadlines',express.static(__dirname+ '/RedditHeadlines/app'));
	app.use('/41Thieves', express.static(__dirname + '/41Thieves'));
	app.use(express.static(__dirname + '/app')); 
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.methodOverride());
});

require('./server/route.js')(app);

app.listen(port);
console.log('App listening on port ' + port);
