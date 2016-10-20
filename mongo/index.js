var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/Safood');

var userSchema = mongoose.Schema({
    userid: {type: String, unique: true},
    username: {type: String},
    password: {type: String},
    profileImage: {type: String},
    apikey: {type: String},
    groupid: {type: String},

    history:[{
       foodname:{type: String},
       searchdate:{type: Date}
    }],

    exception: {
        religion: {type: Array},
        allergy: {type: Array},
    }
});

var userGroupSchema = mongoose.Schema({
    groupname: {type: String},
    groupid: {type: String},
    admin: {type: String},
    members: {type: Array},
    limit: {type: Number},
    img_url: {type: String},

    memo:[{
      title: {type: String},
      content: {type: String},
      color: {type: Number},
      foods: [String],
      have: {type: String}
    }]
});

var foodSchema = mongoose.Schema({
    name: {type: String},
    foodid: {type: String},
    thumbnail: {type: String},
    barcode: {type: String},
    foodAllergic: {type: String},
    foodIngredient: {type: String},
});

var safoodGroupSchema = mongoose.Schema({
    id: {type: String},
    name: {type: String},
    admin: {type: String},
    foodList: {type: Array}
});


var fooddicSchema = mongoose.Schema({
    id: {type: String},
    name: {type: String},
    img_url: {type: String},
    material: [String],
    content: {type: String}
})



var User = mongoose.model("User", userSchema);
var UserGroup = mongoose.model("UserGroup", userGroupSchema);
var Food = mongoose.model("Food", foodSchema);
var SafoodGroup = mongoose.model("SafoodGroup", safoodGroupSchema);
var FoodDic = mongoose.model("FoodDic", fooddicSchema);

exports.User = User;
exports.db = db;
exports.UserGroup = UserGroup;
exports.Food = Food;
exports.SafoodGroup = SafoodGroup;
exports.FoodDic = FoodDic;
