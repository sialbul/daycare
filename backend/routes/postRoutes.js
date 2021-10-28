const express = require('express');
const postController = require("../controllers/postController");
const router = express.Router();

module.exports = () => {
    router.route("/").get(postController.getAllStudents).post(postController.createNewStudent);
    router.route("/:id").get(postController.getStudentById);

    return router;
};
