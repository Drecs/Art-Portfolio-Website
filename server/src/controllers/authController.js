const prisma = require("../../prisma/prisma");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //  Only check email
        const emailExists = await prisma.user.findUnique({
            where: { email }
        });

        if (emailExists) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { username, email, password: hashed }
        });

        res.status(201).json({
            message: "User registered successfully",
            token: generateToken(user),
        });

    } catch (error) {
        if (error.code === "P2002") {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) return res.status(404).json({ message: "Invalid Email" });

        // Check password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid Password" });

        res.json({
            message: "Login success",
            token: generateToken(user),
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
