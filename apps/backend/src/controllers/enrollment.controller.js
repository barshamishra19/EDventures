import Enrollment from "../models/Enrollment.model.js";

export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Check if already enrolled
    const exists = await Enrollment.findOne({
      student: req.user._id,
      course: courseId
    });

    if (exists) return res.status(400).json({ message: "Already enrolled" });

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId
    });

    res.json({
      message: "Enrolled successfully",
      enrollment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const myCourses = async (req, res) => {
  try {
    const courses = await Enrollment.find({ student: req.user._id })
      .populate("course");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
