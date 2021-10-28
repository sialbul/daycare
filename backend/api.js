// const con = require('./connection');

// // con.query("ALTER TABLE students (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), sex CHAR(1), birth DATE, mother VARCHAR(255), father VARCHAR(255))",function(err, result){
// //     if(err) throw err;
// //     console.log("err");
// // });

// exports.addStudents = app.post('/api/students', (req, res) => {
//     let sql = "INSERT INTO students (name, address, sex, birth, mother, father) VALUES ?";
//     let students = {
//         name: req.body.name,
//         address: req.body.address,
//         sex: req.body.sex,
//         birth: req.body.birth,
//         mother: req.body.mother,
//         father: req.body.father
//     }

//     con.query(sql, [students], function (err, result) {
//         res.json({ id: result.id });

//         if (err) throw err;
//         console.log(`Record ${result.id} succesfully inderted`);
//     });

// });


// exports.getStudents = app.get('/allstudents', (req, res) => {
//     con.query("SELECT * FROM students", function (err, result) {
//         if (err) throw err;
//         console.log(result );
//     })
// });

