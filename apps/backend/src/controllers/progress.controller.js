import Progress from "../models/progress.js";

// Get progress
export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user._id });
    if (!progress) return res.status(404).json({ message: "No progress found" });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add/update progress
export const addProgress = async (req, res) => {
  try {
    const { moduleName, score } = req.body;
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
};

// Reset progress
export const resetProgress = async (req, res) => {
  try {
    await Progress.deleteOne({ userId: req.user._id });
    res.json({ message: "Progress reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
