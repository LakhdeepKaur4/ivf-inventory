const express = require("express");
const controller = require("../business/category-logic");
const verify = require('../helpers/auth');

const router = express.Router();

router.route("/").post(controller.createCategory);

router.route("/").get(controller.getCategory);

router.route("/search").get(controller.searchCategory);

router.route("/initial").get(controller.getInitialCategory);

router.route("/edit/:id").get(controller.getCategoryById);

// router.route("/initial/test").get(controller.testCategory);

router.route("/:id").get(controller.getParticularCategory);

router.route("/:id").put(controller.updateCategory);

router.route("/delete/:id").put(controller.deleteCategory);

router.route("/enable/:categoryId").put(controller.enableCategory);

router.route("/disable/:categoryId").put(controller.disableCategory);

router.route("/multiSelect/changeStatus").put(controller.multiEnableOrDisable);

router.route("/:pageNumber/:limit").get(controller.getCategoriesByPage);

module.exports = router;
