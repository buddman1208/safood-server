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

}