var express = require('express');
var Firebird = require('node-firebird');
var path = require('path');
var router = express.Router();

var options = {};

options.host = '127.0.0.1';
options.port = 3050;
options.database = path.join(__dirname, '/ETALON.fdb');
options.user = 'SYSDBA';
options.password = 'masterkey';

router.post('/', function (req, res, next) {
    Firebird.attach(options, function (err, db) {
        if (err) {
            next(err);
        } else {
            db.query(req.body.query, function (err, result) {
                db.detach();
                if (err) {
                    err.message = "Wrong query";
                    next(err);
                } else {
                    res.send(result);
                }
            });
        }
    });
});
module.exports = router;