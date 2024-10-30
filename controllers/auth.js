const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const VendorModel = require("../models/vendor");


exports.signUp = async (req, res, next) => {
    const reqErr = validationResult(req);
    const { name, email, password, rePassword, phoneNo} = req.body;
    let hashedPassword;
    try {
        if (!reqErr.isEmpty()) {
            const err = new Error(reqErr.errors.map(d => d.msg));
            err.statusCode = 422;
            throw err;
        }
        if (!(password.trim() === rePassword.trim())) {
            const err = new Error("Password DoesNot Match");
            err.statusCode = 422;
            throw err;
        }
        const existingUser = await VendorModel.findOne({ _id: email });
        if (existingUser) {
            const err = new Error("User Exists Please Login");
            err.statusCode = 422;
            throw err;
        }

        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            const error = new Error('Try Again. Something Went Wront')
            throw error;
        }

        try {
            const newUser = new VendorModel({
                name: name,
                email: email,
                phoneNo: phoneNo,
                address: add,
                password: hashedPassword
            })
            const user = await newUser.save();
            var token = jwt.sign({ name: user.name, id: user._id, role: user.role }, process.env.JWTKEY, { expiresIn: "10 days" });
            res.status(201).json({ message: "User Created", data: { name: user.name, id: user.id, role: user.role, token: token } })
        } catch (err) {
            throw new Error("Something Went Wrong Try Again");
        }

    } catch (err) {
        next(err);
    }




}
exports.signIn = async (req, res, next) => {
    const reqErr = validationResult(req);
    const { email, password } = req.body;
    try {

        if (!reqErr.isEmpty()) {
            const err = new Error(reqErr.errors.map(d => d.msg));
            err.statusCode = 422;
            throw err;
        }

        const user = await VendorModel.findOne({ _id: email });
        if (!user) {
            const err = new Error("Invalid Email");
            err.statusCode = 422;
            throw err;
        }
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            const err = new Error("Invalid Password");
            err.statusCode = 422;
            throw err;
        }
        try {
            var token = jwt.sign({ name: user.name, id: user._id, role: user.role }, process.env.JWTKEY, { expiresIn: "10 days" });
            res.status(200).json({ message: "User Authenticated", data: { name: user.name, id: user.id, token: token } })
        } catch (err) {
            throw new Error("Something Went Wrong Try Again");
        }

    } catch (err) {
        next(err);
    }
}