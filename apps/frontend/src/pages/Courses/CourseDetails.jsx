import { useParams, Link } from "react-router-dom";

const dummyModules = [
  { title: "Introduction to JS", done: true },
  { title: "Variables & Data Types", done: true },
  { title: "Functions & Scope", done: true },
  { title: "Async & Promises", done: false },
  { title: "ES6 Features", done: false },
];

export default function CourseDetails() {
  const { id } = useParams();
  const completed = dummyModules.filter((m) => m.done).length;
  const percent = Math.round((completed / dummyModules.length) * 100);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-indigo-400">JavaScript Mastery</h1>
          <p className="text-gray-400">{percent}% complete</p>
        </div>
        <Link to="/courses" className="btn-ghost">← Back to Courses</Link>
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-3">Modules</h2>

        {dummyModules.map((m, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg flex justify-between items-center border ${
              m.done
                ? "bg-indigo-500/10 border-indigo-500/30 text-white"
                : "bg-slate-900/70 border-slate-800 text-gray-300"
            }`}
          >
            <span>{m.done ? "✅" : "📘"} {m.title}</span>
            {m.done ? (
              <span className="text-xs text-green-400">Completed</span>
            ) : (
              <Link to={`/courses/${id}/continue`} className="btn-primary text-xs">Start</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
