const User = require("../models/User")

exports.createNewUser = async (req, res, next) => {
    try {
        let { first_name, last_name, email, user_name, password } = req.body;
        let user = new User(first_name, last_name, email, user_name, password);
        user = await user.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        next(error);
    }
}