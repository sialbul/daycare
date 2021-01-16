const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Student = mongoose.model('Student', adminSchema);
module.exports = Student;