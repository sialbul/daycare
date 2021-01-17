const router = require('express').Router();
let Student = require('../models/student.model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') +
            file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.route('/').get((req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post(upload.single('studentImage'), (req, res) => {
    console.log(req.file);
    const studentname = req.body.studentname;
    const gender = req.body.gender;
    const birthdate = Date.parse(req.body.birthdate);
    const studentImage = req.file.path;


    const newStudent = new Student({ studentname, gender, birthdate, studentImage });

    newStudent.save()
        .then(() => res.json('Student added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;