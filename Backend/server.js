import dotenv from "dotenv";

dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import starStudentRoutes from "./routes/starStudentRoutes.js";


const app = express();

app.use(cors({
  origin: [
    "https://nurture-and-grow-school.onrender.com",
    "http://localhost:5173"
  ]
}));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Nurture and Grow Backend is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/star-students", starStudentRoutes);

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
