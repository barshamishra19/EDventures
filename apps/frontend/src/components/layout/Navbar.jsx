import { Link, NavLink } from "react-router-dom";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-slate-950/70 border-b border-slate-800">
      <div className="container-page flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-slate-300 hover:text-white text-xl"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
          <Link to="/" className="font-bold text-lg text-indigo-400">EDventure</Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: "/", label: "Dashboard" },
            { to: "/games", label: "Games" },
            { to: "/rewards", label: "Rewards" },
            { to: "/wallet", label: "Wallet" },
            { to: "/courses", label: "Courses" },
            { to: "/profile", label: "Profile" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl text-sm transition ${
                  isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
