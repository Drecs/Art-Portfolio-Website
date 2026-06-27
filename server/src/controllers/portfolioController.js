const prisma = require("../../prisma/prisma");

exports.createPortfolio = async (req, res) => {
    try {
        const { title, description } = req.body;

        const profilePic = req.files?.profilePic
            ? req.files.profilePic[0].filename
            : null;

        const samples = req.files?.samples || [];

        // 1. Create portfolio first
        const portfolio = await prisma.portfolio.create({
            data: {
                title,
                description,
                profilePic,
                userId: req.user.id,
            },
        });

        // 2. Insert images into PortfolioImage table
        if (samples.length > 0) {
            await prisma.portfolioImage.createMany({
                data: samples.map(file => ({
                    imageUrl: file.filename,
                    portfolioId: portfolio.id
                }))
            });
        }

        // 3. Return full portfolio
        const fullPortfolio = await prisma.portfolio.findUnique({
            where: { id: portfolio.id },
            include: { images: true }
        });

        res.json(fullPortfolio);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};