const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
console.log("Router loaded");

router.get("/", homeController.home);

module.exports = router;
