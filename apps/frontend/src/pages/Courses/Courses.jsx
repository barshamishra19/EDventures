import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "JavaScript Mastery",
    description: "From basics to async, closures, and ES6+",
    progress: 72,
    level: "Intermediate",
    lessons: 18,
    xp: 1200,
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 2,
    title: "Web3 Fundamentals",
    description: "Learn blockchain, wallets, and smart contracts",
    progress: 45,
    level: "Beginner",
    lessons: 12,
    xp: 800,
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: 3,
    title: "React & Frontend Design",
    description: "Modern UI building with hooks and components",
    progress: 89,
    level: "Advanced",
    lessons: 24,
    xp: 1500,
    color: "from-blue-400 to-cyan-500",
  },
];

export default function Courses() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-indigo-400">Courses</h1>
        <p className="text-gray-400">Your enrolled courses and progress 📘</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="card relative overflow-hidden group cursor-pointer p-5">
            <div className={`absolute inset-0 bg-linear-to-br ${course.color} opacity-20 group-hover:opacity-30 transition`} />
            <div className="relative space-y-3">
              <h2 className="text-xl font-semibold text-white">{course.title}</h2>
              <p className="text-gray-400 text-sm">{course.description}</p>

              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-2 bg-indigo-400 rounded-full" style={{ width: `${course.progress}%` }} />
              </div>

              <div className="flex justify-between text-sm text-gray-400">
                <span>{course.progress}% completed</span>
                <span>{course.lessons} lessons</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs px-3 py-1 bg-white/10 rounded-full">{course.level}</span>
                <span className="text-xs text-indigo-300">+{course.xp} XP</span>
              </div>

              <div className="flex gap-3 mt-4">
                <Link to={`/courses/${course.id}/continue`} className="btn-primary flex-1 text-center">Continue</Link>
                <Link to={`/courses/${course.id}/details`} className="btn-ghost flex-1 text-center">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
