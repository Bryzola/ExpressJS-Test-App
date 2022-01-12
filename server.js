//CONFIG
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//PORT
var port = process.env.PORT || 8080;

//ROUTES
var routes = require('./routes');

app.use('/', routes);

//STARTUP
app.listen(port);
console.log('Using port: ' + port);