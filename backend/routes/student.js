const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/').get((req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const studentname = req.body.studentname;
    const gender = req.body.gender;
    const birthdate = Number(req.body.birthdate);

    const newStudent = new Student({ studentname, gender, birthdate, });

    newAdmin.save()
        .then(() => res.json('Admin added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;