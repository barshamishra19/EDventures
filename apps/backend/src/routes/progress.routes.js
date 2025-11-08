import express from "express";
import Progress from "../models/Progress.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get user progress
router.get("/", protect, async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user._id });
    if (!progress) return res.status(404).json({ message: "No progress found" });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add/update progress for a module
router.post("/add", protect, async (req, res) => {
  try {
    const { moduleName, score } = req.body;
    if (!moduleName || typeof score !== "number") {
      return res.status(400).json({ message: "Module name and valid score are required" });
    }

    let progress = await Progress.findOne({ userId: req.user._id });

    if (!progress) {
      progress = new Progress({ userId: req.user._id, completedModules: [], totalScore: 0 });
    }

    progress.completedModules.push({ moduleName, score });
    progress.totalScore += score;
    progress.lastUpdated = Date.now();

    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reset user progress
router.delete("/reset", protect, async (req, res) => {
  try {
    const result = await Progress.deleteOne({ userId: req.user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No progress to reset" });
    }
    res.json({ message: "Progress reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
