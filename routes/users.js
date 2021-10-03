const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.timeline);
router.get("/profile", usersController.profile);

module.exports = router;
