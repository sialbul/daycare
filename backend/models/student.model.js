const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    studentname: { type: String, required: true },
    gender: { type: String, required: true },
    birthdate: { type: Date, required: true },
    img: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;