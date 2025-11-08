export const isInstructor = (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can perform this action" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
