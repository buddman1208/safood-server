var port = 4000;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var randomstring = require('randomstring');
var app = express();
var http = require('http').Server(app);
var db = require('./mongo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

require('./routes/auth')(app, db, randomstring);
require('./routes/user')(app, db);
require('./routes/dbin')(app, db);
require('./routes/search')(app, db);
require('./routes/img')(app, db);
require('./routes/group')(app, db, randomstring);
require('./routes/fooddic')(app, db, randomstring);
require('./routes/safood')(app, db, randomstring);

module.exports = app;
http.listen(port, function(){
    console.log('Safood Server running on Port ' + port);
});
