import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/airesumelogo.png";
import { Link } from "react-router-dom";
import { getUserName, isLoggedIn, logout } from "../../services/axiosClient";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Before login links (with About, Contact, FAQ)
  const guestLinks = [
    { label: "Find Jobs", href: "/coming-soon" },
    { label: "For Employers", href: "/coming-soon" },
    { label: "Resume Builder", href: "/resume-builder" },
    { label: "Resources", href: "/resources" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ];

  // 🔹 After login links (without About/Contact/FAQ, with My Resume)
  const userLinks = [
    { label: "Find Jobs", href: "/coming-soon" },
    { label: "For Employers", href: "/coming-soon" },
    { label: "Resume Builder", href: "/resume-builder" },
    { label: "Resources", href: "/resources" },
    { label: "My Resume", href: "/my-resume" },
  ];

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  const linksToShow = isLoggedIn() ? userLinks : guestLinks;

  return (
    <nav className="bg-white text-black shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Airesume Logo" className="h-80 w-auto" />
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex items-center justify-center rounded-md p-2 md:hidden focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4 relative">
            <ul className="flex items-center gap-1 uppercase font-semibold">
              {linksToShow.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="block rounded-md px-3 py-2 text-base hover:bg-gray-100 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right side: Sign In or Profile */}
            {isLoggedIn() ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="ml-2 inline-flex items-center justify-center rounded-full bg-blue-600 text-white w-9 h-9 font-semibold hover:bg-blue-500 transition"
                >
                  {  getUserName()?getUserName().charAt(0).toUpperCase() : "U"}
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg border border-gray-100 py-2">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white hover:bg-blue-500 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="primary-nav"
        className={`md:hidden ${
          menuOpen ? "block" : "hidden"
        } border-t border-gray-200`}
      >
        <ul className="space-y-1 px-4 py-3 uppercase font-semibold">
          {linksToShow.map(({ label, href }) => (
            <li key={label}>
              <Link
                to={href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition"
              >
                {label}
              </Link>
            </li>
          ))}

          <li>
            {isLoggedIn() ? (
              <>
                <Link
                  to="/profile"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition"
                >
                  My Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block rounded-md bg-blue-600 px-4 py-2 text-center text-white font-semibold rounded-lg hover:bg-blue-500 transition"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
