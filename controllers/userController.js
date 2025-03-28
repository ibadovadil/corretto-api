const { default: mongoose } = require("mongoose");
const { User, UserValidation } = require("../models/user/userModel.js");
const bcrypt = require('bcrypt');
const auth = require("../middlewares/auth.js");

exports.UserListItem = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

exports.UserGetById = async (req, res) => {
    try {
        auth(req, res, async () => {
            const id = req.params.id;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).send('User not found');
            }
            console.log(user);

            res.status(200).send(user);  // Kullanıcıyı gönderiyoruz
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
exports.UserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        console.log(user);
        return res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
// {
//     id: '67d29c2fe5158f6a1f009319',
//     fullname: 'Adil Ibadov',
//     role: 'user',
//     iat: 1741855811,
//     exp: 1741942211
//   }









exports.UserCreate = async (req, res) => {
    try {
        const { error } = UserValidation(req.body);
        if (error) {
            res.status(400).send(error.message);
        }
        else {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ message: 'User already registered' });
            }
            else {

                if (req.body.role === "admin") {
                    const existingAdmin = await User.findOne({ role: "admin" });
                    if (existingAdmin) {
                        return res.status(403).send('An admin already exists. Cannot create another one.');
                    }
                }
                const hashPassword = await bcrypt.hash(req.body.password, 10); //Hash Password with Bcrypt

                user = new User(req.body);
                user.password = hashPassword;

                const token = user.generateAuthToken(); //Create Token Method

                const result = await user.save();
                res.status(201).header("X-Auth-Token", token).send(result);  //Send Token in Header
            }
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

exports.UserUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const { error } = UserValidation(req.body);
        if (error) {
            res.status(400).send(error.message);
        }
        else {
            const user = await User.findByIdAndUpdate
                (id, req.body, { new: true });
                console.log(req.body); 
            if (!user) {
                return res.status(404).send('User not found');
            }
            else {
                res.status(200).send(user);
            }
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

exports.UserDelete = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
        }
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}