const express = require('express');
const studentController = require("../controllers/studentController");
const userController = require("../controllers/userController");

const router = express.Router();

module.exports = () => {
    router.route("/students").get(studentController.getAllStudents).post(studentController.createNewStudent);
    router.route("/students/:id").get(studentController.getStudentById);
    router.route("/signup").post(userController.createNewUser);

    return router;
};
