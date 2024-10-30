const express = require("express");
const { body } = require("express-validator");

const CommonController = require('../controllers/common');

const router = express.Router();

router.get('/getEvents', CommonController.getEvents);

module.exports = router;

