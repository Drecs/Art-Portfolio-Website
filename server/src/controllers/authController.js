const prisma = require("../../prisma/prisma");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check existing user
        const userExists = await prisma.user.findUnique({
            where: { email }
        });
        if (userExists) return res.status(400).json({ message: "Email already exists" });

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: { username, email, password: hashed }
        });

        // Return JWT
        res.json({
            message: "User registered successfully",
            token: generateToken(user),
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) return res.status(404).json({ message: "Invalid credentials" });

        // Check password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid credentials" });

        res.json({
            message: "Login success",
            token: generateToken(user),
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
