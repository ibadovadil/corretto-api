const { LoginValidation, User } = require("../models/user/userModel.js");
const bcrypt = require('bcrypt');

exports.userAuth = async (req, res) => {
    try {
        const { error } = LoginValidation(req.body);
        if (error) {
            res.status(400).send(error.message);
        } else {
            let user = await User.findOne({ email: req.body.email }); //Find User by Email
            if (!user) {
                return res.status(400).send('Email or password is wrong');
            }
            else {
                const isValidPassword = await bcrypt.compare(req.body.password, user.password); //Compare Password with Bcrypt
                if (!isValidPassword) {
                    return res.status(403).send({ message: 'Email or password is wrong'});
                } else {
                    const token = user.generateAuthToken(); //Create Token Method
                    return res.status(200).header("X-Auth-Token", token).send({ token, user });
                }
            }
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};