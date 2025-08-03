import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ✅ GET user by email
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ role: user.role }); // শুধুমাত্র role পাঠাও
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
