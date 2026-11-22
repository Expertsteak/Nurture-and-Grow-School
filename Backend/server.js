import dotenv from "dotenv";

dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import mediaRoutes from "./routes/mediaRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Nurture and Grow Backend is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);

app.get("/api/admin/check", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Admin access granted!",
    admin: req.admin.email
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
