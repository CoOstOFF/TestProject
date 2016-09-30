import express from 'express';
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Query App'
    });
});

export default router;
