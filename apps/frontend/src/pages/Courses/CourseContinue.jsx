import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function CourseContinue() {
  const { id } = useParams();

  // static sample (replace with fetch later)
  const course = {
    title: "JavaScript Mastery",
    xp: 1200,
    progress: 72,
    streak: 5,
    nextLesson: "Async & Promises",
  };

  const controls = useAnimation();
  const [displayXP, setDisplayXP] = useState(0);

  // XP counter
  useEffect(() => {
    let start = 0;
    const end = course.xp;
    const duration = 1200;
    const step = end / (duration / 30);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayXP(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // progress fill
  useEffect(() => {
    controls.start({ width: `${course.progress}%`, transition: { duration: 1.2, ease: "easeOut" } });
  }, [controls]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-indigo-400">Continue: {course.title}</h1>
          <p className="text-gray-400">Keep your streak alive 🔥</p>
        </div>
        <Link to="/courses" className="btn-ghost">← Back to Courses</Link>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
        className="card p-6 space-y-6"
      >
        <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="absolute top-0 left-0 h-3 bg-indigo-400 rounded-full" initial={{ width: "0%" }} animate={controls} />
        </div>

        <div className="flex justify-between text-gray-400 text-sm">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            {course.progress}% completed
          </motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-indigo-300">
            +{displayXP} XP earned
          </motion.span>
        </div>

        <motion.div
          className="p-5 mt-4 rounded-xl bg-slate-900/70 border border-slate-800"
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h3 className="font-semibold text-white">Next Lesson</h3>
          <p className="text-indigo-300 mt-1 text-lg">{course.nextLesson}</p>
        </motion.div>

        <div className="mt-4 flex justify-end">
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          >
            Start Lesson →
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
