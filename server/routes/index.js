import express from 'express';
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'SQL Query App'
    });
});

export default router;
