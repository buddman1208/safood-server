module.exports = auth;

function user(app, db, randomStr) {
    app.post('/user/destroySelf', function (req, res) {
        var apikey = req.body.apikey;
        if (apikey != undefined && apikey != null) {
            db.User.remove({apikey: apikey}, function (err, numAff) {
                if (err) {
                    throw err;
                } else res.sendStatus(200);
            })
        } else res.sendStatus(403);
    });
    app.post('/user/getSelfInfo', function (req, res) {
        var apikey = req.body.apikey;
        if (apikey != undefined && apikey != null) {
            db.User.findOne({apikey: apikey}, function (err, doc) {
                if (err) {
                    throw err;
                } else res.send(doc);
            })
        } else res.sendStatus(403);
    });
    app.post('/user/getSearchHistory', function (req, res) {
        var apikey = req.body.apikey;
        if (apikey != undefined && apikey != null) {
            db.User.findOne({apikey: apikey}, function (err, doc) {
                if (err) {
                    throw err;
                } else res.send(doc.history);
            })
        } else res.sendStatus(403);
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
        } else res.sendStatus(403);
    });

    app.post('/user/updateAllergicException', function (req, res) {
        // TODO file update must be modified
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
        } else res.sendStatus(403);
    });


    function checkParams(body, params) {
        return params.forEach(str -> body[str] != undefined && body[str] != null);
    }
}