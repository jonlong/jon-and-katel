/**
 * Module dependencies.
 */

var subdomain = require('express-subdomain');
var express = require('express');
var app = express();
var router = express.Router();

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
app.use(express.static(__dirname + '/public'));

/* Routes */

//RSVP route
router.get('/', function(req, res) {
  res.render('rsvp');
});

// RSVP subdomain
app.use(subdomain('rsvp', router));

// Index route
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Index'
  });
});

// Start 'er up
app.listen(config.web.port);
console.log('Express app started on port ' + config.web.port);