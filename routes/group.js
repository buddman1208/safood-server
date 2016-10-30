var Q = require('q');
var multer = require('multer');

var upload = function (req, res, groupid) {
    var deferred = Q.defer();
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function (req, file, cb) {
            cb(null, "upload/group");
        },

        // 서버에 저장할 파일 명
        filename: function (req, file, cb) {
            file.uploadedFile = {
                name: groupid,
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
          db.UserGroup.find({grouptag: req.body.grouptag}, function (err, docs) {
              if (docs.length != 0) {
                  var newGroup = new db.UserGroup({
                      groupid: groupid,
                      admin: req.body.admin,
                      limit: req.body.limit,
                      img_url: "defult",
                      members: [
                          req.body.admin
                      ]
                  });
                  params.forEach(e => newGroup[e] = req.body[e]);

                  newGroup.save(function (err) {
                      if (err) throw err;
                  });

                  db.User.update({userid:req.body.admin}, {groupid:newGroup.groupid}, function(err, numAf){
                      if(err) throw err;
                      else res.status(200).send(newGroup);
                  });
              }
              else res.sendStatus(409);
          });
        }else{
            deferred.resolve(req.file.uploadedFile);
        }
    });
    return deferred.promise;
};

module.exports = group;

function group(app, db, randomStr) {

    app.post('/group/searchGroup', function (req, res) {
        var params = ['query'];
        if (checkParams(req.body, params)) {

            db.UserGroup.find({groupname: req.body.query}, function (err, docs) {
                if (docs.length != 0) res.send(docs);
                else res.sendStatus(401);
            })
        } else res.sendStatus(403);
    });

    app.post('/group/getGroupInfo', function (req, res) {
        var params = ['groupid'];

        if (checkParams(req.body, params)) {
            db.UserGroup.find({groupid: req.body.groupid}, function (err, doc) {
                if (doc.length != 0) res.send(doc);
                else res.sendStatus(401);
            })
        } else res.sendStatus(403);
    });

    app.post('/group/joinGroup', function (req, res) {
        var params = ['apikey', 'groupid'];

        if (checkParams(req.body, params)) {
            db.UserGroup.findOne({groupid: req.body.groupid}, function (err, doc) {
                if (err) throw err;
                else if (doc != null) {
                    if (doc.members.indexOf(req.body.apikey) == -1) {
                        db.UserGroup.update({groupid: req.body.groupid},
                            {$push: {members: req.body.apikey}}, function (err, numAff) {
                                if (err) throw err;
                                else if (numAff == 0) res.sendStatus(401);
                                else{
                                   db.User.update({apikey: req.body.apikey}, {groupid: req.body.groupid}, function(err, resual){
                                      if(err) throw err;
                                      else res.sendStatus(200);
                                   });
                                }
                            });
                    } else res.sendStatus(409);
                } else res.sendStatus(401);
            });
        } else res.sendStatus(403);
    });

    app.post('/group/leaveGroup', function (req, res) {
        var params = ['apikey', 'groupid'];

        if (checkParams(req.body, params)) {
            db.UserGroup.findOne({groupid: req.body.groupid}, function (err, doc) {
                if (err) throw err;
                else if (doc != null) {
                    if (doc.members.indexOf(req.body.apikey) > -1) {
                        db.UserGroup.update({groupid: req.body.groupid},
                            {pull: {members: req.body.apikey}}, function (err, numAff) {
                                if (err) throw err;
                                else if (numAff == 0) res.sendStatus(401);
                                else res.sendStatus(200);
                            });
                    } else res.sendStatus(409);
                } else res.sendStatus(401);
            });
        } else res.sendStatus(403);
    });

    app.post('/group/admin/checkGroupTag', function (req, res) {
        var params = ['grouptag'];

        if (checkParams(req.body, params)) {
            db.UserGroup.find({grouptag: req.body.grouptag}, function (err, docs) {
                if (docs.length != 0) res.sendStatus(200);
                else res.sendStatus(409);
            })
        } else res.sendStatus(403);
    });

    app.post('/group/admin/createGroup', function (req, res) {
        var params = ['groupname', 'grouptag', 'admin', 'file', 'limit'];
        var groupid = randomStr.generate();

        if (checkParams(req.body, params)) {

          upload(req, res, groupid).then(function (file) {
            db.UserGroup.find({grouptag: req.body.grouptag}, function (err, docs) {
                if (docs.length != 0) {
                    var newGroup = new db.UserGroup({
                        groupid: groupid,
                        admin: req.body.admin,
                        limit: req.body.limit,
                        img_url: "http://iwin247.net:4000/img/group/"+groupid,
                        members: [
                            req.body.admin
                        ]
                    });
                    params.forEach(e => newGroup[e] = req.body[e]);

                    newGroup.save(function (err) {
                        if (err) throw err;
                    });

                    db.User.update({userid:req.body.admin}, {groupid:newGroup.groupid}, function(err, numAf){
                        if(err) throw err;
                        else res.status(200).send(newGroup);
                    });
                }else res.sendStatus(409);
            });

          }, function (err) {
              if(err) return res.status(409).send(err);
          });


        } else res.sendStatus(403);
    });

    app.post('/group/admin/destroyGroup', function (req, res) {
        var params = ['userid', 'groupid'];

        if (checkParams(req.body, params)) {
            db.UserGroup.findOne({groupid: req.body.groupid}, function (err, doc) {
                if (doc != null) {
                    if (doc.admin == req.body.userid) {
                        db.UserGroup.remove({groupid: req.body.groupid}, function (err, numAF) {
                            if (err) throw err;
                            else {
                                db.User.update({groupid : req.body.groupid}, {groupid : ''}, function (err, numAF) {
                                    if(err) throw err;
                                    else res.sendStatus(200);
                                })
                            }
                        });
                    } else res.sendStatus(401);
                } else res.sendStatus(400);
            })
        }
    });

    app.post('/group/admin/modifyGroupInfo', function (req, res) {
        var params = ['userid', 'groupname', 'groupid', 'grouptag'];
        if (checkParams(req.body, params)) {
            db.UserGroup.findOne({groupid: req.body.groupid}, function (err, doc) {
                if (doc != null) {
                    if (doc.admin == req.body.userid) {
                        db.UserGroup.update({groupid: req.body.groupid},
                            {groupname: req.body.groupname, grouptag: req.body.grouptag}, function (err, numAF) {
                                if (err) throw err;
                                else res.sendStatus(200);
                            });
                    } else res.sendStatus(401);
                } else res.sendStatus(400);
            })
        }
    });


    app.post('/group/admin/addUser', function (req, res) {
        var params = ['userid', 'targetid', 'groupid'];
        if (checkParams(req.body, params)) {
            db.UserGroup.findOne({groupid: req.body.groupid}, function (err, doc) {
                if (doc != null) {
                    if (doc.admin == req.body.userid) {
                        if (doc.members.indexOf(req.body.targetid) == -1) {
                            db.UserGroup.update({groupid: req.body.groupid},
                                {$push: {members: req.body.targetid}}, function (err, numAF) {
                                    if (err) throw err;
                                    else res.sendStatus(200);
                                });
                        } else res.sendStatus(409);
                    } else res.sendStatus(401);
                } else res.sendStatus(400);
            })
        }
    });

    app.post('/group/admin/removeUser', function (req, res) {
        var params = ['userid', 'targetid', 'groupid'];
        if (checkParams(req.body, params)) {
            db.UserGroup.findOne({groupid: req.body.groupid}, function (err, doc) {
                if (doc != null) {
                    if (doc.admin == req.body.userid) {
                        if (doc.members.indexOf(req.body.targetid) > -1) {
                            db.UserGroup.update({groupid: req.body.groupid},
                                {$pull: {members: req.body.targetid}}, function (err, numAF) {
                                    if (err) throw err;
                                    else res.sendStatus(200);
                                });
                        } else res.sendStatus(409);
                    } else res.sendStatus(401);
                } else res.sendStatus(400);
            })
        }
    });


    app.post('/group/admin/removeUser', function (req, res) {
        var params = ['userid', 'targetid', 'groupid'];
        if (checkParams(req.body, params)) {
            db.UserGroup.findOne({groupid: req.body.groupid}, function (err, doc) {
                if (doc != null) {
                    if (doc.admin == req.body.userid) {
                        if (doc.members.indexOf(req.body.targetid) > -1) {
                            db.UserGroup.update({groupid: req.body.groupid},
                                {$pull: {members: req.body.targetid}}, function (err, numAF) {
                                    if (err) throw err;
                                    else res.sendStatus(200);
                                });
                        } else res.sendStatus(409);
                    } else res.sendStatus(401);
                } else res.sendStatus(400);
            })
        }
    });


    app.post('/group/memoAdd', function (req, res) {
        var params = ['title', 'content', 'color', 'foods', 'groupid'];

        if (checkParams(req.body, params)) {
            db.UserGroup.findOne({groupid: req.body.groupid}, function (err, doc) {
                if (doc != null) {
                  db.UserGroup.update({groupid: req.body.groupid}, {$push: {memo: {title: req.body.title, content: req.body.content, color: req.body.color, foods: req.body.foods.toString().split(',')}}}, function(err, result){
                    if(err) err;
                      db.UserGroup.findOne({groupid: req.body.groupid}, function (err, docs) {
                          if(err) err;
                          res.status(200).send(docs.memo);
                      });
                  });
                } else res.sendStatus(400);
            })
        }
    });


    app.post('/group/memo', function (req, res) {
        var params = ['groupid'];

        if (checkParams(req.body, params)) {
            db.UserGroup.findOne({groupid: req.body.groupid}, function (err, doc) {
                if (doc != null) {
                  res.status(200).json(doc.memo);
                } else res.sendStatus(400);
            })
        }
    });


    function checkParams(body, params) {
        return params.every(str => body[str] != null);
    }
}
