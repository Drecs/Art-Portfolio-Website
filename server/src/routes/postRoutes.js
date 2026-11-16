
const express = require("express");
const router = express.Router();

const {
    createPost,
    getPosts,
} = require("../controllers/postController");

const authMiddleware = require("../utils/decodeToken");
const upload = require("../middlewares/upload");

// Display all posts
router.get("/", getPosts);

// Create a post (login required)
router.post(
    "/",
    authMiddleware,
    upload.array("images", 10),
    createPost
);

module.exports = router;
