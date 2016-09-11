var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/Safood');

var userSchema = mongoose.Schema({
    userid: {type: String},
    username: {type: String},
    password: {type: String},
    profileImage: {type: String},
    apikey: {type: String},
    groupid: {type: String},
    history: {type: String},
    exception: {
        religion: {type: Array},
        allergy: {type: Array},
        custom: {type: Array}
    }
});

var userGroupSchema = mongoose.Schema({
    groupname: {type: String},
    groupid: {type: String},
    grouptag: {type: String},
    admin: {type: String},
    members: {type: Array}
});

var foodSchema = mongoose.Schema({
    name: {type: String},
    weight: {type: String},
    weightUnit: {type: String},
    barcode: {type: String},
    foodType: {type: String},
    foodAllergic: {type: String},
    foodIngredient: {type: String},
    foodCalorie: {type: String},
    foodOnceIntake: {type: String}
});

var safoodGroupSchema = mongoose.Schema({
    name: {type: String},
    admin: {type: String},
    lastUpdate: {type: Date},
    foodList: {type: Array}
});

var User = mongoose.model(userSchema);
var UserGroup = mongoose.model(userGroupSchema);
var Food = mongoose.model(foodSchema);
var SafoodGroup = mongoose.model(safoodGroupSchema);
exports.User = User;
exports.db = db;
exports.UserGroup = UserGroup;
exports.Food = Food;
exports.SafoodGroup = SafoodGroup;