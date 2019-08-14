const express = require("express");
const controller = require("../business/test-logic");
const verify = require('../helpers/auth');

const router = express.Router();

router.route("/").post(controller.register);

router.route("/test").post(controller.registerTest);

module.exports = router;
