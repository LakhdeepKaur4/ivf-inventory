const express = require("express");

const controller = require("../business/upload-logic");

const router = express.Router();

router.route("/make").get(controller.makeBucket);

router.route("/").post(controller.uploadFiles);

// router.route("/get/file").get(controller.fetchFiles);


module.exports = router; 