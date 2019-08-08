const express = require('express');

const controller = require('../business/stores-product-mapping-logic');

const router = express.Router();

router.route("/").post(controller.createMapping);

module.exports = router;