import express from 'express';
import Firebird from 'node-firebird';
import path from 'path';
let router = express.Router();

let options = {};

options.host = '127.0.0.1';
options.port = 3050;
options.database = path.join(__dirname, '/ETALON.fdb');
options.user = 'SYSDBA';
options.password = 'masterkey';

router.post('/', (req, res, next) => {
    Firebird.attach(options, (err, db) => {
        db.transaction(Firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
            transaction.query(req.body.query, (err, result) => {
                if (err) {
                    transaction.rollback();
                    next(err);
                }

                transaction.commit(function (err) {
                    if (err)
                        transaction.rollback();
                    else
                        db.detach();
                });
            })
        });

        db.on('result', (result) => {
            res.send(result);
        });

    });
});
export default router;