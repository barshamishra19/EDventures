import { Trophy, Flame, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const mockCourses = [
  {
    id: 1,
    title: "JavaScript Mastery",
    description: "From basics to async and ES6+",
    progress: 72,
    xp: 1200,
    level: "Intermediate",
  },
  {
    id: 2,
    title: "React & Frontend Design",
    description: "Modern UI building with hooks & components",
    progress: 89,
    xp: 1500,
    level: "Advanced",
  },
];

function StatCard({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex items-center gap-3 bg-slate-900/70 rounded-xl p-4 w-full border border-slate-800 hover:border-indigo-400/30 transition"
    >
      <div className="p-3 bg-indigo-500/20 rounded-full text-indigo-400">{icon}</div>
      <div>
        <h4 className="text-sm text-gray-400">{label}</h4>
        <p className="text-xl font-semibold text-white">{value}</p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-indigo-400">Dashboard</h1>
        <p className="text-gray-400 mt-1">Track your progress, XP, and ongoing courses 📈</p>
      </div>

      {/* STATS SECTION */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard icon={<Star />} label="Total XP" value="12,400" />
        <StatCard icon={<Flame className="text-orange-400" />} label="Streak" value="7 Days 🔥" />
        <StatCard icon={<Trophy className="text-yellow-400" />} label="Badges" value="8" />
      </section>

      {/* COURSES SECTION */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Your Courses</h2>
          <Link to="/courses" className="text-indigo-400 text-sm hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-5 border border-slate-800 hover:border-indigo-400/30 transition-all"
            >
              <h3 className="font-semibold text-lg text-white">{course.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{course.description}</p>

              <div className="h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                <motion.div
                  className="h-2 bg-indigo-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              <p className="text-xs text-gray-400 mt-2">{course.progress}% complete</p>

              <div className="flex gap-3 mt-4">
                <Link to={`/courses/${course.id}/continue`} className="btn-primary flex-1 text-center">
                  Continue
                </Link>
                <Link to={`/courses/${course.id}/details`} className="btn-ghost flex-1 text-center">
                  Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold text-white mb-3">Achievements 🏆</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="badge">🔥 7-Day Streak</span>
          <span className="badge">🪙 500 Tokens</span>
          <span className="badge">⭐ Intermediate Badge</span>
        </div>
      </section>

      {/* MINI GAMES */}
      <section className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Mini Games 🎮</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Quiz Arena", "Flashcards Rush", "Code Combat"].map((game, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-4 rounded-xl bg-slate-950/70 hover:bg-slate-900/80 border border-slate-800 hover:border-indigo-400/30 transition cursor-pointer"
            >
              <h3 className="font-semibold text-white text-lg">{game}</h3>
              <p className="text-sm text-gray-400 mt-1">Earn XP and sharpen your skills</p>
              <button className="btn-primary mt-3 px-3 py-1.5 text-sm">Play</button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
