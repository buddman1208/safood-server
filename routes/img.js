module.exports = img;

function img(app, db) {
    app.get('/img/group/:img', function (req, res) {
       res.sendFile("/node/safood-server/upload/group/"+req.params.img);
    });

    app.get('/img/food/:img', function (req, res) {
       res.sendFile("/node/safood-server/upload/food/"+req.params.img);
    });

    app.get('/img/user/:img', function (req, res) {
       res.sendFile("/node/safood-server/upload/user/"+req.params.img);
    });
}
