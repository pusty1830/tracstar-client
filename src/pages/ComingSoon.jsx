import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/airesumelogo1.png"; // 👈 Update the path to your logo

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-[Inter] px-4 text-center">
      {/* Logo */}
      <div className="">
        <Link to="/">
          <img
            src={logo}
            alt="Tracstars Informatics"
            className="h-30 object-contain mx-auto"
          />
        </Link>
      </div>

      {/* Main Text */}
      <div className="max-w-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#041d29] mb-4">
          🚀 Coming Soon
        </h1>
        <p className="text-slate-600 text-lg mb-8">
          We’re working hard to bring something amazing to you.
          <br /> Stay tuned for updates from{" "}
          <strong>Tracstars Informatics</strong>.
        </p>

        {/* Notify Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-[#041d29] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-900 transition"
          >
            Notify Me
          </button>
        </form>

        <Link
          to="/"
          className="text-blue-600 font-semibold hover:underline underline-offset-4"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
