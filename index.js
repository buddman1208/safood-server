var port = 3000;

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

module.exports = app;
http.listen(port, function(){
    console.log('Safood Server running on Port ' + port);
});
