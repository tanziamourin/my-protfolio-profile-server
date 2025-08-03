import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import messages from "./routes/messages.js";
import userRoutes from "./routes/userRoutes.js";
import seedAdminUser from "./utils/adminSeeder.js"; // 👈 Admin Seeder import

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));
app.use(express.json());

// Database Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    seedAdminUser(); // 👈 Call admin seeder here after DB connects
  })
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.use("/api/messages", messages);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
