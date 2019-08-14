const express = require("express");
const controller = require("../business/user-logic");

const router = express.Router();

router.route("/").post(controller.register);

module.exports = router;