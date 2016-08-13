var port = 3000;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', function(req, res){
  res.send('Testing API').status(200);
})
module.exports = app;
http.listen(port, function(){
    console.log('Safood Server running on Port ' + port);
});
