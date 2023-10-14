const express = require("express");
const {registUser} = require("../controllers/userController");

const router = express.Router();

router.post('/register', registUser);

module.exports = router;