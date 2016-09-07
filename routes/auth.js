module.exports = auth;

function auth(app, db, randomStr) {
    var registerParams = ['userid', 'username', 'password'];
    var loginParams = ['userid', 'password'];
    var autologinParams = ['token'];
    app.post('/auth/login', function (req, res) {
        if (loginParams.every(str => req.body[str] != undefined)) {
            db.User.findOne({userid: req.body.userid}, function (err, doc) {
                if (doc != null) {
                    if (loginParams.every(str => req.body[str] == doc[str])) {
                        res.send(doc);
                        console.log('User Login : \n' + doc);
                    } else res.sendStatus(400);
                } else res.sendStatus(400);
            });
        } else res.sendStatus(403);
    });

    app.post('/auth/register', function (req, res) {
        if (registerParams.every(str => req.body[str] != undefined || req.body[str] != null)) {
            db.User.find({id: req.body.userid}, function (err, docs) {
                if (docs.length == 0) {
                    var newUser = new db.User({
                        apikey : randomStr.generate(),
                        groupid : '',
                        exception : {
                            religion: {},
                            allergy: {},
                            custom: {}
                        }
                    });
                    registerParams.forEach(a => newUser[a] = req.body[a]);
                    console.log(newUser);
                    newUser.save();
                    res.send(newUser);
                } else res.sendStatus(409);
            });
        } else res.sendStatus(403);
    });
    app.post('/auth/login/auto', function (req, res) {

    });
    // app.post('/auth/findPassword');

}