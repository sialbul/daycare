const router = require('express').Router();

// you can remove this route after checking that this base route works in Postman
router.get('/', (req, res) => {
    res.status(200).send('Sending from the /api root.');
});

router.use('/articles', require('./articlesController'));

// this is the catch-all route when a non-existent /api route is sought
router.use((req, res, next) => {
    const error = new Error('API route not found!');
    error.status = 404;
    next(error);
});

// this is the default error handle where next(error) is caught
router.use((error, req, res, next) => {
    res.status(error.status || 500).send('An error occurred!\n' + error.message);
});

module.exports = router;