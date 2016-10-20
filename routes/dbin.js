var unirest = require('unirest');

module.exports = user;

function user(app, db) {
  app.get('/search/:id', function(req, res){
     if(get(req.params.id)){
       res.send("su");
     }
  });

  function get(id) {
    var materials = "";
    
    unirest.get('https://apis.eatsight.com/foodinfo/1.0/foods/'+id)
        .headers({'Content-Type': 'application/json', 'DS-ApplicationKey': 'c3a5142c-ad30-4589-b67f-9eac3cdfab6c', 'DS-AccessToken': '648e4cc5-46a6-4cfb-b3be-95c114232aa5'})
        .end(function (res) {
            db.Food.update({foodid: id}, {barcode: res.body.barcode, name: res.body.foodName.replace(/ /gi, '').trim()}, function(err, result){
               if(err) err;
            });
    });
     
     unirest.get('https://apis.eatsight.com/foodinfo/1.0/foods/'+id+'/materials')
        .headers({'Content-Type': 'application/json', 'DS-ApplicationKey': 'c3a5142c-ad30-4589-b67f-9eac3cdfab6c', 'DS-AccessToken': '648e4cc5-46a6-4cfb-b3be-95c114232aa5'})
        .end(function (res) {
            for(var i = 0; i<res.body.foodMaterials.length; i++){
               if(i == res.body.foodMaterials.length-1){
                 materials += res.body.foodMaterials[i].materialName;
               }else{
                 materials += res.body.foodMaterials[i].materialName +",";
               }
            }
            db.Food.update({foodid: id}, {foodIngredient: materials}, function(err, result){
               if(err) err;
            });

            db.Food.update({foodid: id}, {foodAllergic: res.body.allergyIngredientContent}, function(err, result){
               if(err) err;
            });
    });


    return true;

  }
}
