const express = require("express");
const controller = require("../business/customer-logic");

const router = express.Router();

router.route("/").get(controller.searchCustomer);

router.route("/").post(controller.createCustomer);

module.exports= router;