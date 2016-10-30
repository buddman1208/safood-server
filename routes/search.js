module.exports = user;

function user(app, db) {
    app.post('/search/barcode', function(req, res) {
        var params = ['apikey', 'barcode', 'date'];
        if (checkParams(req.body, params)) {
            db.User.findOne({
                apikey: req.body.apikey
            }, function(err, result) {
                if (err) throw err;
                if (result) {
                    db.Food.findOne({
                        barcode: req.body.barcode
                    }, function(err, food) {
                        if (err) err;
                        if (food) {
                            var re = ['소고기', '돼지고기'];
                            var al = ["계란", "대두", "우유", "밀", "땅콩", "해산물", "과일", "채소", "갑각류", "간장"];
                            var real = [];
                            var final = [];

                            for (var i = 0; i< result.exception.religion.length; i++) {
                                if (result.exception.religion[i]) {
                                    real.push(re[i]);
                                }
                            }

                            for (var i = 0; i< result.exception.allergy.length; i++) {
                                if (result.exception.allergy[i]) {
                                    real.push(al[i]);
                                }
                            }


                            db.Food.findOne({
                                barcode: req.body.barcode
                            }, function(err, food) {
                                if (err) err;
                                if (food) {
                                    for (var i = 0; i < real.length; i++) {
                                        if (food.foodAllergic.indexOf(real[i]) > -1) {
                                            final.push(real[i]);
                                        }
                                    }

                                    db.User.update({apikey: req.body.apikey}, {$push: {history: {foodname: food.name.trim(), date: req.body.date}}}, function(err, user) {
                                       if(err) throw err;
                                    });

                                    res.json({
                                        name: food.name,
                                        thumbnail: food.thumbnail,
                                        foodIngredient: food.foodIngredient,
                                        allergy: final
                                    });
                                }
                            });
                        } else {
                            res.status(405).send("not found");
                        }
                    });
                }
            });

        } else res.status(403).send('Missing Params');
    });

    app.post('/search', function(req, res) {
      var params = ['foodname'];
      var search = [];
      if (checkParams(req.body, params)) {
        db.Food.find({}, function(err, food){
            for(var i = 0; i< food.length; i++){
               if(food[i].name.indexOf(req.body.foodname) > -1){
                 search.push(food[i]);
               }
            }

            if(search.length>0){
             res.status(200).send(search);
           }else{
             res.sendStatus(405)
           }
        });
      }
    });


    app.post('/search/foodDic', function(req, res) {
      var params = ['foodname'];
      var search = [];

      if (checkParams(req.body, params)) {
        db.FoodDic.find({}, function(err, food){
            for(var i = 0; i< food.length; i++){
               if(food[i].name.indexOf(req.body.foodname) > -1){
                 search.push(food[i]);
               }
            }

            if(search.length>0){
             res.status(200).send(search);
           }else{
             res.sendStatus(405)
           }
        });
      }
    });


    function checkParams(body, params) {
        return params.every(str => body[str] != null);
    }

}
