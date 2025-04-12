import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
// Enable CORS for your frontend (you can set multiple origins if needed)
app.use(
  cors({
    origin: [
      "https://revisitecommercefrontendassignment.vercel.app",
      "http://localhost:5173",
    ], // Replace with your frontend URL if deployed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("✅ Backend is up and running!");
});
