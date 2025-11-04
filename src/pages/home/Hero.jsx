import React from "react";
import heroBg from "../../assets/hero3.jpg"; // 👈 your background image

const Hero = () => {
  return (
    <section
      className="relative flex items-center bg-cover bg-no-repeat bg-right-center min-h-[90vh] py-24"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div
          className="bg-white/85 rounded-lg p-6 md:p-10 shadow-lg"
          style={{ maxWidth: "600px" }}
        >
          {/* Job Seekers Section */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Ready to land your dream job?
          </h1>
          <p className="mt-3 text-slate-600">
            Tracstars Informatics connects job seekers with top companies — and
            helps you build a professional resume that gets noticed.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="/coming-soon"
              className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              START YOUR SEARCH
            </a>
            <a
              href="/resume-builder"
              className="inline-flex items-center text-sm font-bold text-blue-600 hover:underline underline-offset-4"
            >
              BUILD YOUR RESUME
            </a>
          </div>

          {/* Employers Section */}
          <h2 className="mt-10 text-2xl md:text-3xl font-extrabold text-slate-900">
            Looking to hire top talent?
          </h2>
          <p className="mt-3 text-slate-600">
            Join hundreds of growing businesses using Tracstars Informatics to
            find the right candidates — faster and smarter.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="/coming-soon"
              className="inline-flex items-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              HIRE TALENT NOW
            </a>
            <a
              href="/contact"
              className="inline-flex items-center text-sm font-bold text-blue-600 hover:underline underline-offset-4"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
