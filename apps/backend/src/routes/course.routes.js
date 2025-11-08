import express from "express";
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse
} from "../controllers/course.controller.js";


import protect from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/", getCourses);
router.get("/:id", getCourse);


router.post("/", protect, createCourse);
router.put("/:id", protect, updateCourse);
router.delete("/:id", protect, deleteCourse);

export default router;
