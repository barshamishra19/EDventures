import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import testRoutes from "./routes/test.routes.js";
import courseRoutes from "./routes/course.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import progressRoutes from "./routes/progress.routes.js"; 

import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();


const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("EDventures Backend Server is running");
});


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", testRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/progress", progressRoutes); 
app.use(errorHandler);

export default app;
