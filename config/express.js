let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

module.exports = function() {

	let app = express();

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	consign({cwd: 'app'})
		.include('routes')
		.then('infra')
		.into(app);

	return app;
}
