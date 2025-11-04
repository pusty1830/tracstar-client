import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/tracstar.png"; // 👈 Update the path to your logo

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#041d29] text-white font-[Inter] px-4">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/">
          <img
            src={logo}
            alt="Tracstars Informatics"
            className="h-14 object-contain mx-auto"
          />
        </Link>
      </div>

      {/* 404 Content */}
      <h1 className="text-[7rem] md:text-[9rem] font-extrabold text-blue-400 leading-none">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-slate-300 max-w-md text-center mb-8">
        Oops! The page you’re looking for doesn’t exist or might be under
        construction.
      </p>
      <Link
        to="/"
        className="bg-white text-[#041d29] px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
