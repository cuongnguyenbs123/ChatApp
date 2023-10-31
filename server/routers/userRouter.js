const express = require("express");
const {
  registUser,
  loginUser,
  findUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registUser);
router.post("/login", loginUser);
router.get("/find/:id", findUser);
router.get("/", getUser);

module.exports = router;
