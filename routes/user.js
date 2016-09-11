module.exports = user;

function user(app, db) {
    app.post('/user/destroySelf', function (req, res) {
        var apikey = req.body.apikey;
        if (apikey != undefined && apikey != null) {
            db.User.remove({apikey: apikey}, function (err, numAff) {
                if (err) {
                    throw err;
                } else res.sendStatus(200);
            })
        } else res.status(403).send('Missing Params');
    });
    app.post('/user/getSelfInfo', function (req, res) {
        var apikey = req.body.apikey;
        if (apikey != undefined && apikey != null) {
            db.User.findOne({apikey: apikey}, function (err, doc) {
                if (err) {
                    throw err;
                } else res.send(doc);
            })
        } else res.status(403).send('Missing Params');
    });
    app.post('/user/getSearchHistory', function (req, res) {
        var apikey = req.body.apikey;
        if (apikey != undefined && apikey != null) {
            db.User.findOne({apikey: apikey}, function (err, doc) {
                if (err) {
                    throw err;
                } else res.send(doc.history);
            })
        } else res.status(403).send('Missing Params');
    });

    app.post('/user/updateSelfInfo', function (req, res) {
        // TODO file update must be modified
        var params = ['apikey', 'userid', 'password', 'username', 'profileImage'];
        var update_params = ['userid', 'password', 'username', 'profileImage'];
        if (checkParams(req.body, params)) {
            db.User.update({apikey: req.body.apikey}, {update_params: req.body[update_params]}, function (err, numAff) {
                if (err) {
                    throw err;
                } else res.sendStatus(200);
            })
        } else res.status(403).send('Missing Params');
    });

    app.post('/user/updateAllergicException', function (req, res) {
        var params = ['apikey', 'allergic'];
        if (checkParams(req.body, params)) {
            db.User.findOne({apikey: req.body.apikey}, function (err, doc) {
                if (err) {
                    throw err;
                } else {
                    doc.exception.allergy[req.body.allergic] = true;
                    db.User.update({apikey: req.body.apikey}, {exception: {allergy: doc.exception.allergy}}, function (err, numAff) {
                        if (err) throw err;
                        else res.sendStatus(200);
                    });
                }
            })
        } else res.status(403).send('Missing Params');
    });

    app.post('/user/updateReligiousException', function (req, res) {
        var params = ['apikey', 'religious'];
        if (checkParams(req.body, params)) {
            db.User.findOne({apikey: req.body.apikey}, function (err, doc) {
                if (err) {
                    throw err;
                } else {
                    doc.exception.religion[req.body['religious']] = true;
                    db.User.update({apikey: req.body.apikey}, {exception: {religion: doc.exception.religion}}, function (err) {
                        if (err) throw err;
                        else res.sendStatus(200);
                    });
                }
            })
        } else res.status(403).send('Missing Params');
    });

    app.post('/user/addKeywordException', function (req, res) {
        var params = ['apikey', 'keyword'];
        if (checkParams(req.body, params)) {
            db.User.findOne({apikey: req.body.apikey}, function (err, doc) {
                if (doc != null) {
                    var custom = doc.exception.custom;
                    var keyword = req.body.keyword;
                    if (custom.indexOf(keyword) > -1) res.sendStatus(409);
                    else {
                        custom.push(keyword);
                        db.User.update({apikey: req.body.apikey}, {exception: {custom: custom}}, function (err) {
                            if (err) throw err;
                            else res.sendStatus(200);
                        });
                    }
                } else res.sendStatus(401);
            });
        } else res.status(403).send('Missing Params');
    });

    app.post('/user/removeKeywordException', function (req, res) {
        var params = ['apikey', 'keyword'];
        if (checkParams(req.body, params)) {
            db.User.findOne({apikey: req.body.apikey}, function (err, doc) {
                if (doc != null) {
                    var custom = doc.exception.custom;
                    var keyword = req.body.keyword;
                    var index = custom.indexOf(keyword);
                    if (index > -1) {
                        custom.splice(index, index + 1);
                        db.User.update({apikey: req.body.apikey}, {exception: {custom: custom}}, function (err) {
                            if (err) throw err;
                            else res.sendStatus(200);
                        })
                    } else res.sendStatus(409);
                } else res.sendStatus(401);
            });
        } else res.status(403).send('Missing Params');
    });

    app.post('/user/searchUser', function (req, res) {
        var params = ['searchByName', 'username', 'userid'];
        var searchByName = req.body.searchByName;
        if (checkParams(req.body, params)) {
            if (searchByName) {
                db.User.findOne({username: req.body.username}, function (err, doc) {
                    if (err) throw err;
                    else if (doc != null) res.send(doc);
                    else res.sendStatus(401);
                });
            } else {
                db.User.findOne({userid: req.body.userid}, function (err, doc) {
                    if (err) throw err;
                    else if (doc != null) res.send(doc);
                    else res.sendStatus(401);
                });
            }
        } else res.status(403).send('Missing Params');
    });


    function checkParams(body, params) {
        return params.forEach(str -> body[str] != undefined && body[str] != null);
    }
}