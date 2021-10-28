const Student = require("../models/Student")

exports.getAllStudents = async (req, res, next) => {
    try {
        const [students, _] = await Student.findAll();
        res.status(200).json({ count: students.length, students });

    } catch (error) {
        next(error)
    }
};

exports.createNewStudent = async (req, res, next) => {
    try {
        let { studentName, address, sex, birth, mother, father } = req.body;
        let student = new Student(studentName, address, sex, birth, mother, father);
        student = await student.save();
        res.status(201).json({ message: "Student created" });
    } catch (error) {
        next(error);
    }
}

exports.getStudentById = async (req, res, next) => {
    try {
        let studentId = req.params.id;
        let [student, _] = await Student.findById(studentId);
        res.status(200).json({ student: student[0] })
    }
    catch (error) {
        next(error);
    }
}