import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className="py-12 bg-slate-100 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-10 w-full mx-4 max-w-[1000px] flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
        {/* Left Side */}
        <div>
          <h2 className="text-[#0d1b2a] text-2xl md:text-[28px] font-extrabold mb-3">
            Let’s build your hiring journey together
          </h2>
          <p className="text-slate-500 text-base md:text-lg mb-4">
            Tracstars Informatics connects top talent and growing businesses.
            Whether you're hiring or job hunting, we're ready to help you get
            started.
          </p>
        </div>

        {/* Right Side */}
        <div>
          <Link
            to="/contact"
            className="inline-block bg-slate-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-slate-800 transition"
          >
            CONTACT US NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
