const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/auth.js");

const router = express.Router();
const { protectRoute } = require("../middleware/auth.js");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/me").get(protectRoute, getMe);

module.exports = router;
