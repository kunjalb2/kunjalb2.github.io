const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/UserController");
const userRouter = express.Router();

const UserController = require('../controllers/UserController');
const auth = require("../middleware/auth");

userRouter.post('/user/signup', [
    check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
], UserController.registerUser);

userRouter.post('/user/login', [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
], userController.loginUser);

userRouter.get('/user/profile', auth, UserController.getUserProfile)

module.exports = userRouter;