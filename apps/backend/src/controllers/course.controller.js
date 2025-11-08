import Course from "../models/course.model.js";


export const createCourse = async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can create courses" });
    }

    const { title, description, category, level } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      level,
      instructor: req.user._id
    });

    res.status(201).json({ message: "Course created", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ message: "Course updated", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
