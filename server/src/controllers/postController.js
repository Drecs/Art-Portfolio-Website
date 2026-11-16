
const prisma = require("../../prisma/prisma");

// ===================================
// CREATE POST
// ===================================
exports.createPost = async (req, res) => {
    try {
        const { description } = req.body;

        const images = req.files || [];

        if (!description || !description.trim()) {
            return res.status(400).json({
                message: "Post description is required",
            });
        }

        // 1. Create the post first
        const post = await prisma.post.create({
            data: {
                description,
                userId: req.user.id,
            },
        });

        // 2. Save uploaded images in PostImage table
        if (images.length > 0) {
            await prisma.postImage.createMany({
                data: images.map(file => ({
                    imageUrl: file.filename,
                    postId: post.id,
                })),
            });
        }

        // 3. Return the complete post
        const fullPost = await prisma.post.findUnique({
            where: {
                id: post.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                images: true,
            },
        });

        res.status(201).json(fullPost);

    } catch (error) {
        console.error("Error creating post:", error);

        res.status(500).json({
            message: "Failed to create post",
        });
    }
};


// ===================================
// GET ALL POSTS
// ===================================
exports.getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                images: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(posts);

    } catch (error) {
        console.error("Error fetching posts:", error);

        res.status(500).json({
            message: "Failed to fetch posts",
        });
    }
};
