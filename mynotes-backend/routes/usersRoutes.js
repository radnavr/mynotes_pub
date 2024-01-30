const express = require("express");
const router = express.Router();
const {
  registerUser,
  authenticateUser,
  getUserData,
} = require("../controllers/usersController");
const authHandler = require("../middleware/authHandler");

router.post("/", registerUser);
router.post("/login", authenticateUser);
router.get("/user", authHandler, getUserData);

module.exports = router;
