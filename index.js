/**
 * Module dependencies.
 */

var express = require('express');
var app = express();

/**
 * Application
 */

// Load configuration
var env = process.env.NODE_ENV || 'development';
var config = require('./config');

/* Express config */

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

// Routes
require('./routes')(app);

// Start 'er up
app.listen(config.web.port);
console.log('Express app started on port ' + config.web.port);