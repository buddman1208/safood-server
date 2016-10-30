/**
 * Created by GrooshBene on 2016. 9. 11..
 */

var http = require('http');
var https = require('https');

function setAppKey(appkey, callback) {
    userAppKey = appkey;
    return callback(appkey);
}

function createUserKey(appKey, age, sex, location, callback) {
    var requestOptions = {
        "method": "POST",
        "hostname": "apis.eatsight.com",
        "port": null,
        "path": "/foodinfo/1.0/users",
        "headers": {
            "ds-applicationkey": appKey,
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "2a2c7b4c-de56-b4d0-0860-f7817ccf3f93"
        }
    }

    var req = http.request(requestOptions, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            var response = body.toString();
            return callback(JSON.parse(response));
        });

    });

    req.write(JSON.stringify({age: age, sex: sex, location: location}));
    req.end();
    console.log(age + "," + sex + "," + location);
};

function getFoodInfo(appKey, userKey, searchOptions, callback) {
    var http = require("https");

    var options = {
        "method": "GET",
        "hostname": "apis.eatsight.com",
        "port": null,
        "path": "/foodinfo/1.0/foods?foodType=" + searchOptions.foodType + "&searchField=" + searchOptions.searchField + "&searchValue=" +searchOptions.searchValue+ "&offset=" + searchOptions.offset + "&limit="+ searchOptions.limit,
        "headers": {
            "ds-applicationkey": appKey,
            "content-type": "application/json",
            "ds-accesstoken": userKey,
            "cache-control": "no-cache",
            "postman-token": "2c28ead9-523a-9103-e331-8480fa73a0a8"
        }
    };
    console.log(options.path);

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            var response = body.toString();
            callback(JSON.parse(response));
        });
    });
    req.end();
}

function getSpecifiedInfo(appKey, userKey, foodId, callback){
    var options = {
        "method": "GET",
        "hostname": "apis.eatsight.com",
        "port": null,
        "path": "/foodinfo/1.0/foods/"+foodId,
        "headers": {
            "ds-applicationkey": appKey,
            "content-type": "application/json",
            "ds-accesstoken": userKey,
            "cache-control": "no-cache",
            "postman-token": "b651f1b8-f540-d2bd-aa1a-04df18f188a2"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            var request = body.toString();
            callback(JSON.parse(request));
        });
    });

    req.end();
}



exports.setAppKey = setAppKey;
exports.createUserKey = createUserKey;
exports.getFoodInfo = getFoodInfo;
exports.getSpecifiedInfo = getSpecifiedInfo;