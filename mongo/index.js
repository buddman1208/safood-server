var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/Safood');

var userSchema = mongoose.Schema({
    apikey: {type: String},
    username: {type: String},
    email: {type: String},
    userid: {type: String},
    groupid: {type: String},
    password: {type: String},
    exception: {
        religion: {type: Array},
        allergy: {type: Array},
        custom: {type: Array}
    }
});

var groupSchema = mongoose.Schema({
    name: {type: String},
    id: {type: String},
    members: {type: Array},
});

var User = mongoose.model(userSchema);
var Group = mongoose.model(groupSchema);
exports.User = User;
exports.Group = Group;