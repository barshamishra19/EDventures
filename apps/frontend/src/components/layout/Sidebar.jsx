import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      className="
        fixed top-0 left-0 h-screen w-72 z-[100]
        bg-slate-950 text-slate-200 border-r border-slate-800
        flex flex-col justify-between p-6
      "
    >
      {/* ---- Navigation ---- */}
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
          Navigation
        </p>

        <nav className="space-y-1">
          <NavItem to="/" icon="📊" label="Dashboard" />
          <NavItem to="/games" icon="🎮" label="Games" />
          <NavItem to="/rewards" icon="🏆" label="Rewards" />
          <NavItem to="/wallet" icon="👛" label="Wallet" />
          <NavItem to="/courses" icon="📘" label="Courses" />
          <NavItem to="/profile" icon="👤" label="Profile" />
        </nav>
      </div>

      {/* ---- Quick Actions ---- */}
      <div className="mt-8 pt-4 border-t border-slate-800/70">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
          Quick Actions
        </p>
        <button className="w-full text-left px-4 py-2.5 rounded-lg text-slate-400 text-sm hover:bg-slate-800/40 hover:text-indigo-300 transition">
          ⚙️ Settings
        </button>
        <button className="w-full text-left px-4 py-2.5 rounded-lg text-slate-400 text-sm hover:bg-slate-800/40 hover:text-indigo-300 transition">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
         ${
           isActive
             ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
             : "text-slate-400 hover:text-indigo-300 hover:bg-slate-800/40"
         }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}
