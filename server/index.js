const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors());

// Debugging: Log every request
app.use((req, res, next) => {
    console.log(`📢 [${req.method}] ${req.url}`);
    next();
});

// Check if MONGO_URI is provided
if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is not defined in .env file!");
    process.exit(1); // Stop the server
}
mongoose
.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
const articlesRoute = require("./routes/articles");
app.use("/api/articles", articlesRoute);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Global Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
