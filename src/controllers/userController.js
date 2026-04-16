const userModel = require('../models/userModel');

exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Missing fields");
    }

    userModel.createUser({ username, password });
    res.status(201).send("User registered");
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = userModel.findUser(username, password);

    if (!user) {
        return res.status(401).send("Invalid credentials");
    }

    res.send("Login successful");
};