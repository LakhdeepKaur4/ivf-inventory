const express = require("express");

const controller = require("../business/orders-logic");

const router = express.Router();

router.route("/all").get(controller.getOrders);

router.route("/:id").get(controller.getOrderById);

router.route("/").post(controller.create);

module.exports = router;