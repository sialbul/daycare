const con = require('../config/db');

class Student {
    constructor(studentName, address, sex, birth, mother, father) {
        this.studentName = studentName;
        this.address = address;
        this.sex = sex;
        this.birth = birth;
        this.mother = mother;
        this.father = father;
    }
    save() {
        let sql = `INSERT INTO students (studentName, address, sex, birth, mother, father) VALUES(
       "${this.studentName}","${this.address}","${this.sex}","${this.birth}","${this.mother}","${this.father}"
    )`;
        return con.execute(sql);
    }
    static findAll() {
        let sql = "SELECT *, DATE_FORMAT(birth, '%m/%d/%Y') AS formattedBirth FROM students";
        return con.execute(sql);
    }
    static findById(id) {
        let sql = `SELECT * FROM students WHERE id =${id};`;
        return con.execute(sql);
    }
}

module.exports = Student;
