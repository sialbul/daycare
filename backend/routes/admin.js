const router = require('express').Router();
let Admin = require('../models/admin.model');

router.route('/').get((req, res) => {
    Admin.find()
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json('Error: ' + err));
});