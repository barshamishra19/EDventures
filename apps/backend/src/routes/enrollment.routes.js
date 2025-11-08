import express from "express";
import { enrollCourse, myCourses } from "../controllers/enrollment.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/enroll", protect, enrollCourse);


router.get("/my-courses", protect, myCourses);

export default router;
