import User from "../models/User.model.js";

// Get logged-in user profile
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add XP & auto-level up
export const addXP = async (req, res) => {
  try {
    const { xp } = req.body;
    const user = await User.findById(req.user._id);

    user.xp += xp;

    // Level up logic (simple formula)
    const newLevel = Math.floor(user.xp / 100) + 1;
    user.level = newLevel;

    await user.save();

    res.json({
      message: "XP Updated",
      xp: user.xp,
      level: user.level,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
