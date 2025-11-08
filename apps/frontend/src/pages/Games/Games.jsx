export default function Games() {
    const games = [
      { title: "Quiz Quest", category: "MCQ", difficulty: "Easy" },
      { title: "Code Runner", category: "Logic", difficulty: "Medium" },
      { title: "Memory Match", category: "Puzzle", difficulty: "Easy" },
    ];
  
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Games Library 🎮</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((g, i) => (
            <div
              key={i}
              className="card p-5 hover:shadow-2xl transition hover:shadow-indigo-500/20"
            >
              <h3 className="font-semibold">{g.title}</h3>
              <p className="text-sm text-slate-400 mt-1">
                {g.category} • {g.difficulty}
              </p>
              <button className="btn-primary mt-4 w-full">Play Now</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  