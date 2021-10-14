const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.timeline);
router.get("/profile", usersController.profile);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.post("/create-user", usersController.create);
router.post("/create-session", usersController.createSession);

module.exports = router;
