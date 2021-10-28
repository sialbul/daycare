const con = require('../config/db');

class User {
    constructor(first_name, last_name, email, user_name, password, access_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.user_name = user_name;
        this.password = password;
        this.access_id = "1";

    }
    save() {
        let sql = `INSERT INTO users (first_name, last_name, email, user_name, password, access_id) VALUES(
       "${this.first_name}","${this.last_name}","${this.email}","${this.user_name}","${this.password}", "${this.access_id}"
    )`;
        return con.execute(sql);
    }

}

module.exports = User;
