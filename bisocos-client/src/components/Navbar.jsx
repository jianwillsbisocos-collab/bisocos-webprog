import { NavLink } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import logo from "../assets/styles/logo.jpg";
import { useAuth } from "../contexts/AuthContext";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-200",
    isActive
      ? "border-amber-900 bg-amber-900 text-white shadow-sm shadow-amber-900/20"
      : "border-transparent text-zinc-600 hover:border-amber-900 hover:bg-amber-100 hover:text-zinc-950",
  ].join(" ");

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-amber-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-amber-100 ring-2 ring-amber-900/15">
            <img src={logo} alt="Sneaker Hub Logo" className="h-full w-full object-cover" />
          </div>

          <div className="space-y-0.5">
            <p className="text-lg font-semibold uppercase tracking-[0.22em] text-zinc-950">
              Sneaker Hub
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Kicks + Culture
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-3 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <div className="flex items-center gap-2 ml-2">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-700 bg-white border border-zinc-200 rounded-full px-3 py-2">
                <User className="h-3.5 w-3.5" />
                {user.name || user.email}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-full border-2 border-red-200 bg-red-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-red-700 transition hover:bg-red-100"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <NavLink
to="/auth/signin"
                className={({ isActive }) =>
                  [
                    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-200",
                    isActive
                      ? "border-amber-900 bg-amber-900 text-white"
                      : "border-transparent text-zinc-600 hover:border-amber-900 hover:bg-amber-100 hover:text-zinc-950",
                  ].join(" ")
                }
              >
                Sign In
              </NavLink>
              <NavLink
to="/auth/signup"
                className="rounded-full border-2 border-amber-900 bg-amber-900 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-sm shadow-amber-900/20 transition hover:bg-amber-800"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;

