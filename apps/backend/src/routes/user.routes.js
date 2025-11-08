import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import User from "../models/User.model.js";

const router = express.Router();

/* ===============================
   1️⃣ Get Logged-in User Profile
================================= */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

/* ===============================
   2️⃣ Add XP and Level Up
================================= */
router.post("/add-xp", authMiddleware, async (req, res) => {
  try {
    const { xp } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!xp || typeof xp !== "number")
      return res.status(400).json({ message: "Invalid XP value" });

    user.xp += xp;

    // Simple level system: every 100 XP → +1 level
    while (user.xp >= user.level * 100) {
      user.level += 1;
    }

    await user.save();
    res.json({ xp: user.xp, level: user.level });
  } catch (error) {
    res.status(500).json({ message: "Error adding XP" });
  }
});

/* ===============================
   3️⃣ Get All Users (Admin only in future)
================================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/* ===============================
   4️⃣ Get Single User by ID
================================= */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

/* ===============================
   5️⃣ Update User
================================= */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

/* ===============================
   6️⃣ Delete User
================================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;
