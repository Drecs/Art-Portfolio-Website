const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config({ path: "../.env" });  // your global env

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
