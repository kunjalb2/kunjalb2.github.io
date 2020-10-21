const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require('../models');

const userController = {

    async registerUser(req, res) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { username, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    success: false,
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                expiresIn: 10000
            }, (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    success: true,
                    user: user,
                    token: token
                });
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ success: false, message: err.message });
        }
    },
    async loginUser(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "User Not Exist"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    success: false,
                    message: "Incorrect Password!"
                });

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        success: true,
                        user: user,
                        token: token
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: true,
                message: "Server Error"
            });
        }
    },
    async getUserProfile(req, res) {
        try {
            // request.user is getting fetched from Middleware after token authentication
            const user = await User.findById(req.user.id);
            res.json({ status: true, user: user });
        } catch (e) {
            res.send({ message: "Error in Fetching user" });
        }
    }
};

module.exports = userController;