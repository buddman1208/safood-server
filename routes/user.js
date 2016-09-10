module.exports = auth;

function user(app, db, randomStr) {
    app.post('/user/destroySelf', function(req, res){
        if(req.body.apikey != undefined && req.body.apikey != null){
            db.User.remove({apikey:apikey}, function(err, numAff){
                if(err) {
                    throw err;
                } else res.sendStatus(200);
            })
        } else res.sendStatus(403);
    });
}