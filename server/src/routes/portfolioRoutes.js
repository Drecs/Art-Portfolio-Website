const express = require("express");
const router = express.Router();

const { createPortfolio,
    getPortfolios,
} = require("../controllers/portfolioController");
const authMiddleware = require("../utils/decodeToken");
const upload = require("../middlewares/upload");

// Display portfolios
router.get("/", getPortfolios);

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