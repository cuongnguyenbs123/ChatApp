const express = require("express");
const {registUser, loginUser, findUser} = require("../controllers/userController");

const router = express.Router();

router.post('/register', registUser);
router.post('/login', loginUser);
router.get('/find/:id', findUser); 

module.exports = router;