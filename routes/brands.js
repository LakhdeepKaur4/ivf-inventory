const express = require("express");

const controller = require("../business/brands-logic");

const router = express.Router();

router.route("/").post(controller.createBrand);

router.route("/").get(controller.getBrands);

router.route("/brand/:id").get(controller.getBrand);

router.route("/enable/:id").put(controller.enableBrand);

router.route("/disable/:id").put(controller.disableBrand);

router.route("/:id").put(controller.updateBrand);

router.route("/:id").delete(controller.deleteBrand);

module.exports = router;