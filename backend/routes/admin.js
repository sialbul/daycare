const router = require('express').Router();
let Admin = require('../models/admin.model');

router.route('/').get((req, res) => {
    Admin.find()
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newAdmin = new Admin({ username });

    newAdmin.save()
        .then(() => res.json('Admin added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;