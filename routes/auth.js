const express = require("express");
const controller = require("../business/auth-logic");

const router = express.Router();

router.route("/").post(controller.signin);

module.exports= router;