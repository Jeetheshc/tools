import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { apiRouter } from "./routes/index.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Panchayath toolbox</h1>");
});
app.use('/api', apiRouter);

// Catch-All Route
app.all("*", (req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
