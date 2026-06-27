const express = require("express");
const router = express.Router();

const { createPortfolio } = require("../controllers/portfolioController");
const authMiddleware = require("../utils/decodeToken");
const upload = require("../middlewares/upload");

router.post(
    "/",
    authMiddleware,
    upload.fields([
        { name: "profilePic", maxCount: 1 },
        { name: "samples", maxCount: 10 },
    ]),
    createPortfolio
);

module.exports = router;