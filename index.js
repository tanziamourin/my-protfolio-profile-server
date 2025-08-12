import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import messages from "./routes/messages.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"; // ✅ Added
import seedAdminUser from "./utils/adminSeeder.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "https://tanzia-s-profile.web.app", // frontend  
  credentials: true
}));
app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    seedAdminUser();
  })
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.use("/api/messages", messages);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes); // ✅ Added

app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
