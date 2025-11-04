// Footer.jsx
import React from "react";
import logo from "../../assets/tracstar.png"; // 👈 update the path to your actual logo file
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#041d29] text-white pt-12 pb-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left mb-8">
          <div>
            <h5 className="font-bold text-lg">Our Solutions</h5>
            <p className="text-sm text-gray-400 mt-2 mb-4">
              Discover how Tracstar Informatics can help your business grow with
              innovative technology and strategic solutions.
            </p>
            <button className="inline-flex items-center border border-white/80 text-white text-sm px-4 py-2 rounded hover:bg-white/10 transition">
              OUR SOLUTIONS
            </button>
          </div>
          <div>
            <h5 className="font-bold text-lg">Industries We Serve</h5>
            <p className="text-sm text-gray-400 mt-2 mb-4">
              We work with multiple industries to deliver powerful and scalable
              digital solutions.
            </p>
            <button className="inline-flex items-center border border-white/80 text-white text-sm px-4 py-2 rounded hover:bg-white/10 transition">
              OUR INDUSTRIES
            </button>
          </div>
        </div>

        <hr className="border-gray-700" />

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          {/* Logo and Services */}
          <div>
            <img
              src={logo}
              alt="Tracstar Informatics Logo"
              className="w-36 mb-4"
            />
            <ul className="mt-4 space-y-2">
              {[
                "SOFTWARE DEVELOPMENT",
                "IT CONSULTING",
                "CLOUD SOLUTIONS",
                "DATA ANALYTICS",
                "AUTOMATION",
              ].map((t) => (
                <li key={t}>
                  <Link
                    to="/coming-soon"
                    className="text-sm text-white hover:underline underline-offset-4"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Professionals */}
          <div>
            <h6 className="font-bold">For Professionals</h6>
            <ul className="mt-3 space-y-2">
              {[
                "FIND OPPORTUNITIES",
                "WORKING WITH TRACSTAR",
                "CAREER RESOURCES",
              ].map((t) => (
                <li key={t}>
                  <Link
                    to="/coming-soon"
                    className="text-sm text-white hover:underline underline-offset-4"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h6 className="font-bold">For Businesses</h6>
            <ul className="mt-3 space-y-2">
              {[
                "WHY TRACSTAR",
                "HOW WE WORK",
                "INDUSTRY SOLUTIONS",
                "TECH & INNOVATION",
                "CONTACT US",
              ].map((t) => (
                <li key={t}>
                  <Link
                    to="/about"
                    className="text-sm text-white hover:underline underline-offset-4"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h6 className="font-bold">About Tracstar</h6>
            <ul className="mt-3 space-y-2">
              {[
                "WHO WE ARE",
                "OUR SERVICES",
                "NEWS & INSIGHTS",
                "JOIN OUR TEAM",
                "INVESTOR RELATIONS",
              ].map((t) => (
                <li key={t}>
                  <Link
                    to="/about"
                    className="text-sm text-white hover:underline underline-offset-4"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="mt-8 border-gray-700" />

        {/* Bottom Links */}
        <div className="text-center text-sm mt-4 text-gray-400">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
            {[
              { label: "Terms & Conditions", path: "/terms-and-conditions" },
              { label: "Privacy Policy", path: "/privacy-policy" },
              { label: "Shipping & Delivery Policy", path: "/shipping-policy" },
              {
                label: "Cancellation & Refund Policy",
                path: "/cancellation-refund-policy",
              },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="hover:text-gray-300 hover:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-2 text-xs text-gray-400">
            <p>© Tracstar Informatics 2025</p>
            <span className="hidden md:inline-block mx-2">|</span>
            <p>
              Designed & Developed by{" "}
              <span className="text-white font-medium">Amitav Pusty</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
