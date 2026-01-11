const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") }); // load global .env first


const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
