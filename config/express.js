// load the dependencies that are used in project
var express = require('express'),
    bodyParser = require('body-parser');

// create a method to configure express
module.exports = function()
{
	var app = express();

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

    process.on('uncaughtException', function (err) {
        console.log('==========Log-Exception==========');        
        console.log(err);
        console.log('========end-Log-Exception========');
    });

    require('../app/routes.js')(app);
	return app;
};
