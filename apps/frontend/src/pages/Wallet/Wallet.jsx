import { useState } from "react";

export default function Wallet() {
  const [balance, setBalance] = useState(250);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Wallet 👛</h1>
      <div className="card p-5">
        <p className="text-slate-400 text-sm">Current Balance</p>
        <p className="text-3xl font-bold mt-1">{balance} LC</p>
        <div className="mt-4 flex gap-2">
          <button className="btn-primary" onClick={() => setBalance(b => b + 50)}>
            Add 50
          </button>
          <button
            className="btn-ghost"
            onClick={() => setBalance(b => Math.max(0, b - 20))}
          >
            Spend 20
          </button>
        </div>
      </div>
    </div>
  );
}
