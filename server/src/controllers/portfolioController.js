const prisma = require("../../prisma/prisma");

exports.createPortfolio = async (req, res) => {
    try {
        const { title, description } = req.body;

        const profilePic = req.files["profilePic"]
            ? req.files["profilePic"][0].filename
            : null;

        const samples = req.files["samples"]
            ? req.files["samples"].map((file) => file.filename)
            : [];

        const portfolio = await prisma.portfolio.create({
            data: {
                title,
                description,
                profilePic,
                samples,
                userId: req.user.id,
            },
        });

        res.json(portfolio);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};