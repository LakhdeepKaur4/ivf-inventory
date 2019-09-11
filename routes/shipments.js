const express = require("express");

const controller = require("../business/shipments-logic");

const router = express.Router();

router.route("/all").get(controller.getShipments);

module.exports = router;