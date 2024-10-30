const express = require("express");
const { body } = require("express-validator")
const AuthController = require("../controllers/auth");

const router = express.Router();

router.post('/signUp',
    body("name", "Invalid Name").notEmpty(),
    body("email", "Invalid Email").isEmail(),
    body('password', "Invalid Password").isLength({ min: 8 }).isAlphanumeric(),
    body('phoneNo', "Invalid PhoneNo").isMobilePhone("any"),
    AuthController.signUp);

router.post('/signIn',
    body("email", "Invalid Email").isEmail(),
    body('password', "Invalid Password").isLength({ min: 8 }).isAlphanumeric(),
    AuthController.signIn)
module.exports = router;