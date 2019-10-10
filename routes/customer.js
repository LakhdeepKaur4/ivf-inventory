const express = require("express");
const controller = require("../business/customer-logic");

const router = express.Router();

router.route("/").get(controller.searchCustomer);

router.route("/").post(controller.createCustomer);

// router.route("/update/:customerId").put(controller.updateCustomer);

router.route("/:cartProductId").put(controller.updateQuantityInCartProducts);

router.route("/address/:orderId").put(controller.updateExistingAddresses);

router.route("/add/product").post(controller.addProductsToExistingCart);

router.route("/:orderId/:customerId").put(controller.addBillingAddressofCustomer);


module.exports = router;