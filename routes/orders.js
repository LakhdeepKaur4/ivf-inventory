const express = require("express");

const controller = require("../business/orders-logic");

const router = express.Router();

router.route("/all").get(controller.getOrders);

router.route("/search/cart").get(controller.searchCartProducts);

router.route("/advancedSearch").get(controller.advancedSearchOrders);

router.route("/:id").get(controller.getOrderById);

router.route("/").post(controller.create);

router.route("/:orderId").put(controller.updateOrder);

router.route("/status/:orderId").put(controller.changeStatus);

router.route("/items/:orderId").get(controller.getCartProductsOfExistingOrder);

module.exports = router; 