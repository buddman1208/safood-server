module.exports = safood;

function safood(app, db, randomStr) {

    app.post('/safood/Addgroup', function (req, res) {
        var params = ['query'];
        if (checkParams(req.body, params)) {
            db.UserGroup.find({groupname: req.body.query}, function (err, docs) {
                if (docs.length != 0) res.send(docs);
                else res.sendStatus(401);
            })
        } else res.sendStatus(403);
    });


    function checkParams(body, params) {
        return params.every(str => body[str] != null);
    }
}
