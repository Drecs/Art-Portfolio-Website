const express = require("express");
const router = express.Router();
const { register, login, createPortfolio,

} = require("../controllers/authController");

router.post("/signup", register);
router.post("/login", login);
router.post("/portfolio", createPortfolio);

module.exports = router;
