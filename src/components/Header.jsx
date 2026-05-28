import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import logo_400_webp from "../assets/optimized/logo-400.webp";
import logo_800_webp from "../assets/optimized/logo-800.webp";
import logo_400_jpg from "../assets/optimized/logo-400.jpg";
import logo_800_jpg from "../assets/optimized/logo-800.jpg";
import { usePageTransition } from "../context/TransitionContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Work", to: "/work" },
];

export default function Header() {
  const { navigateTo } = usePageTransition();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const itemRefs = useRef([]);
  const tlRef = useRef(null);

  // Set initial GSAP state before first paint to prevent flash
  useLayoutEffect(() => {
    gsap.set(menuRef.current, { xPercent: 100 });
    gsap.set(overlayRef.current, { autoAlpha: 0 });
    gsap.set(itemRefs.current.filter(Boolean), { y: 24, opacity: 0 });
  }, []);

  // Animate on open/close
  useEffect(() => {
    if (tlRef.current) tlRef.current.kill();

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      tlRef.current = gsap
        .timeline()
        .to(
          overlayRef.current,
          { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
          0,
        )
        .to(
          menuRef.current,
          { xPercent: 0, duration: 0.5, ease: "power3.out" },
          0,
        )
        .to(
          itemRefs.current.filter(Boolean),
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.18,
        );
    } else {
      document.body.style.overflow = "";
      tlRef.current = gsap
        .timeline()
        .to(
          itemRefs.current.filter(Boolean),
          {
            y: 12,
            opacity: 0,
            duration: 0.2,
            stagger: 0.04,
            ease: "power2.in",
          },
          0,
        )
        .to(
          menuRef.current,
          { xPercent: 100, duration: 0.42, ease: "power3.in" },
          0.08,
        )
        .to(
          overlayRef.current,
          { autoAlpha: 0, duration: 0.3, ease: "power2.in" },
          0,
        );
    }

    return () => tlRef.current?.kill();
  }, [menuOpen]);

  // Close on route change — close menu asynchronously on route change to avoid synchronous setState in effect
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Restore scroll on unmount
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );

  function handleNavClick(to) {
    // Prevent transition on current page
    if (location.pathname === to) {
      setMenuOpen(false);
      return;
    }

    setMenuOpen(false);

    setTimeout(() => {
      navigateTo(to);
    }, 420);
  }

  return (
    <>
      <header className="flex items-center sticky top-0 z-1002 bg-inherit border-b border-[#000000] px-4 md:px-8 h-14 md:h-16">
        {/* Logo */}
        <div className="flex flex-1 items-center justify-start">
          <picture>
            <source
              type="image/webp"
              srcSet={`${logo_400_webp} 400w, ${logo_800_webp} 800w`}
              sizes="80px"
            />
            <img
              src={logo_400_jpg}
              srcSet={`${logo_400_jpg} 400w, ${logo_800_jpg} 800w`}
              sizes="80px"
              alt="Domnik's Gallery Logo"
              loading="lazy"
              decoding="async"
              className="w-20 h-16 md:w-30 md:h-25 object-cover rounded-full"
            />
          </picture>
        </div>

        {/* Location — desktop only */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center gap-px">
          <span className="text-sm font-medium text-gray-900">
            Anambra, Nigeria.
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-7 list-none m-0 p-0">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  onClick={(e) => {
                    if (location.pathname === to) {
                      e.preventDefault();
                      return;
                    }

                    e.preventDefault();
                    navigateTo(to);
                  }}
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm font-semibold text-gray-900 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-black"
                      : "text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger button — mobile/tablet only */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.25 w-10 h-10 -mr-1 focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className="block h-px w-5 bg-black origin-center transition-all duration-300 ease-in-out"
            style={{
              transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none",
            }}
          />
          <span
            className="block h-px w-5 bg-black transition-all duration-300 ease-in-out"
            style={{
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
            }}
          />
          <span
            className="block h-px w-5 bg-black origin-center transition-all duration-300 ease-in-out"
            style={{
              transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none",
            }}
          />
        </button>
      </header>

      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-1000 bg-black/25 md:hidden"
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in menu panel */}
      <nav
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="fixed top-0 right-0 h-screen w-4/5 max-w-72 z-1001 bg-[#EDE9E6] flex flex-col px-10 pt-20 pb-10 md:hidden"
      >
        {/* Close × */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center focus:outline-none"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="block w-5 h-px bg-black rotate-45 absolute" />
          <span className="block w-5 h-px bg-black -rotate-45 absolute" />
        </button>

        {/* Nav items */}
        <ul className="flex flex-col gap-7 list-none m-0 p-0">
          {navItems.map(({ label, to }, i) => (
            <li
              key={to}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
            >
              <NavLink
                to={to}
                end
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(to);
                }}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-gray-900"
                    : "text-gray-400 hover:text-gray-900 transition-colors duration-200"
                }
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(28px, 7vw, 38px)",
                }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Footer info */}
        <div className="mt-auto pt-8">
          <div className="w-8 h-px bg-gray-300 mb-5" />
          <p
            className="text-[0.65rem] text-gray-400 tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Roboto Mono', monospace" }}
          >
            Anambra, Nigeria
          </p>
        </div>
      </nav>
    </>
  );
}
