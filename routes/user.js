const express = require("express");
const { body } = require("express-validator");

const UserController = require('../controllers/user');

const router = express.Router();

router.get('/getVendors', UserController.getVendors);

module.exports = router;

