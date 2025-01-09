import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { apiRouter } from "./routes/index.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Use environment port or default to 5000

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON requests

// Routes
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Panchayath toolbox</h1>");
});
// Main API Route
app.use('/api', apiRouter);

// Catch-All Route
app.all("*", (req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
