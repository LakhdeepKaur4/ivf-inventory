const express = require("express");
const controller = require("../business/items-logic");
const verify = require('../helpers/auth');

const router = express.Router();

router.route("/").post(controller.createItems);

router.route("/").get(controller.getItems);

router.route("/search").get(controller.searchItems);

// router.route("/multiselect").get(controller.getItemsByIds);

router.route("/:pageNumber/:limit").get(controller.getItemsByPage);

router.route("/:id").get(controller.getVariantsByProductId);

router.route("/:itemId").put(controller.updateItems);

router.route("/:itemId/:variantId").delete(controller.deleteItems);

router.route("/brand/:id").get(controller.getProductByBrand);

router.route("/category/:id").get(controller.getProductByCategory);

router.route("/variant/:id").put(controller.updateVariant);

router.route("/variant/:id").delete(controller.deleteVariants);

module.exports = router;
