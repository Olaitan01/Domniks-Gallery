import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  return (
    <header className="flex items-center sticky top-0 z-50 bg-inherit border-b border-[#000000] px-8 h-16">
      {/* Box 1 — Logo */}
      <div className="flex flex-1 items-center justify-start">
        <img
          src={logo}
          alt="Domnik's Gallery Logo"
          className="w-18 h-18 object-cover rounded-full"
        />
      </div>

      {/* Box 2 — Location */}
      <div className="flex flex-1 flex-col items-center justify-center gap-px">
        <span className="text-sm font-medium text-gray-900">
          Anambra, Nigeria.
        </span>
      </div>

      {/* Box 3 — Nav */}
      <nav className="flex flex-1 justify-center">
        <ul className="flex items-center gap-7 list-none m-0 p-0">
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-semibold text-gray-900 underline underline-offset-4 decoration-[#C9996B]"
                    : "text-sm text-gray-500 hover:text-gray-900 transition-colors"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
