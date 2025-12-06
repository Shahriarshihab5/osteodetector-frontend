import { Link, NavLink } from "react-router-dom";

const linkBase =
  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors";
const active =
  "bg-emerald-600 text-white shadow-sm";
const inactive =
  "text-emerald-900 hover:bg-emerald-100";

function Navbar() {
  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b border-emerald-100 fixed top-0 left-0 z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
            OA
          </div>
          <span className="text-emerald-900 font-semibold text-sm sm:text-base">
            Osteo Insight
          </span>
        </Link>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            How it works
          </NavLink>
          <NavLink
            to="/disclaimer"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Disclaimer
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
