var Q = require('q');
var multer = require('multer');

var upload = function (req, res, fooddicid) {
  var deferred = Q.defer();
  var storage = multer.diskStorage({
      // 서버에 저장할 폴더
      destination: function (req, file, cb) {
          cb(null, "upload/food");
      },

      // 서버에 저장할 파일 명
      filename: function (req, file, cb) {
          file.uploadedFile = {
              name: fooddicid,
              ext: file.mimetype.split('/')[1]
          };

          cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
      }
  });

  var upload = multer({ storage: storage }).single('file');
  upload(req, res, function (err) {
      if (err) {
          deferred.reject();
      }else if(req.file === undefined){

                var newFood = new db.FoodDic({
                    id: randomStr.generate(),
                    name: req.body.name,
                    img_url: "defult",
                    material: req.body.material.toString().split(','),
                    content: req.body.content
                });

                newFood.save(function (err) {
                    if (err) throw err;
                    else{
                      db.FoodDic.find({}, function(err, fooddic){
                          if(err) err;
                          res.status(200).send(fooddic);
                      });
                    }
                });
      }else{
          deferred.resolve(req.file.uploadedFile);
      }
  });
  return deferred.promise;
};

module.exports = fooddic;
function fooddic(app, db, randomStr){
  app.post('/food/create', function (req, res) {
      var params = ['name', 'material', 'content', 'file'];
      var groupid = randomStr.generate();

      if (checkParams(req.body, params)) {

        upload(req, res, groupid).then(function (file) {
          var newFood = new db.FoodDic({
              id: randomStr.generate(),
              name: req.body.name,
              img_url: "defult",
              material: req.body.material.toString().split(','),
              content: req.body.content
          });

          newFood.save(function (err) {
              if (err) throw err;
              else{
                db.FoodDic.find({}, function(err, fooddic){
                    if(err) err;
                    res.status(200).send(fooddic);
                });
              }
          });

        }, function (err) {
            if(err) return res.status(409).send(err);
        });

      } else res.sendStatus(403);
  });
}
