var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//Require route.js
var routes = require('./routes/route');

var app = express();
var port = process.env.PORT || 3000;

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Static
app.use(express.static(path.join(__dirname, 'public')));
 
//Route
app.use('/', routes);

app.listen(port, function() {
  console.log('Server is up on port ' + port);
});

module.exports = app;