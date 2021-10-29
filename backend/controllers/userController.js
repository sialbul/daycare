const User = require("../models/User")
const bcrypt = require('bcrypt');

exports.createNewUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let { first_name, last_name, email, user_name, password } = req.body;
        let user = new User(first_name, last_name, email, user_name, hashedPassword);
        user = await user.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        next(error);
    }
}

exports.loginUser = async (req, res, next) => {
    const user = user.find(user => user.email === req.body.email)
    if (user == null) {
        return res.status(400).send("Cannot find User")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success")
        } else {
            res.send("Not Allowed")
        }
    } catch (error) {
        next(error);
    }
}