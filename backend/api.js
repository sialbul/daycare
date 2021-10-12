const con = require('./connection');

// con.query("ALTER TABLE students (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), sex CHAR(1), birth DATE, mother VARCHAR(255), father VARCHAR(255))",function(err, result){
//     if(err) throw err;
//     console.log("err");
// });

con.query("INSERT INTO students (name, address, sex, birth, mother, father) VALUES ('Sam Dog','123 street Solon','F','2020-11-12','Caty Cat', 'Doug Cat')", function(err, result){
if(err) throw err;
    console.log("Record inderted");
});