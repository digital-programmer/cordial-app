const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likesControlller");

router.post('/toggle', likesController.toggleLike);

module.exports = router;