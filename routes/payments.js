const express = require("express");

const controller = require("../business/payments-logic");

const router = express.Router();

router.route("/all").get(controller.getPayments);

module.exports = router;