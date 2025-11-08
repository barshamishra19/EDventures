import { useState } from "react";

const items = [
  { id: 1, name: "Pro Badge", cost: 120, type: "Badge" },
  { id: 2, name: "Aurora Theme", cost: 80, type: "Theme" },
  { id: 3, name: "Avatar Frame", cost: 60, type: "Cosmetic" },
];

export default function Rewards() {
  const [balance, setBalance] = useState(250);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rewards Marketplace 🪙</h1>
        <span className="text-slate-400 text-sm">
          Balance: <strong className="text-white">{balance} LC</strong>
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-slate-400 text-sm">Type: {item.type}</p>
              </div>
              <span className="badge">{item.cost} LC</span>
            </div>
            <button
              className={`btn-primary mt-4 w-full ${
                balance < item.cost ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={balance < item.cost}
              onClick={() => setBalance(b => b - item.cost)}
            >
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
