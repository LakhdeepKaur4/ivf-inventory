const express = require("express");
const controller = require("../business/items-logic");
const verify = require('../helpers/auth');

const router = express.Router();

router.route("/").post(controller.createItems);

router.route("/").get(controller.getItems);

router.route("/:id").put(controller.updateItems);

router.route("/:id").delete(controller.deleteItems);

module.exports = router;
