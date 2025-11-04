import React from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import {
  FiSearch,
  FiCheckCircle,
  FiMail,
  FiClipboard,
  FiUserCheck,
} from "react-icons/fi";
import { HiOutlineDocumentCheck } from "react-icons/hi2";

const Application = () => {
  const steps = [
    {
      icon: <FiSearch size={28} />,
      title: "Discover Your Dream Job",
      desc: "Search thousands of verified job listings from top companies through Tracstars Informatics’ powerful job engine.",
    },
    {
      icon: <FiCheckCircle size={28} />,
      title: "Match Your Skills Instantly",
      desc: "Our AI-powered matcher connects your skills and experience with the best roles available in real time.",
    },
    {
      icon: <HiOutlineDocumentCheck size={28} />,
      title: "Build & Attach Your Resume",
      desc: "Use our built-in Resume Builder to create a professional resume in minutes and attach it to your applications effortlessly.",
    },
    {
      icon: <FiMail size={28} />,
      title: "Get Real-Time Updates",
      desc: "Stay informed at every step — receive instant email notifications on job application progress and interview schedules.",
    },
    {
      icon: <FiClipboard size={28} />,
      title: "Interview & Connect",
      desc: "Easily schedule interviews, connect directly with employers, and showcase your profile to multiple companies.",
    },
    {
      icon: <FiUserCheck size={28} />,
      title: "Get Hired Faster",
      desc: "Tracstars Informatics streamlines the hiring process, helping you land your ideal job quickly and confidently.",
    },
  ];

  return (
    <section className="py-16 font-[Inter] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            How Tracstars Informatics Helps You Get Hired
          </h2>
          <p className="mt-2 text-lg text-slate-500 max-w-2xl mx-auto">
            A smarter way to find jobs, build resumes, and connect directly with
            employers — all in one place.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="
                group
                flex items-start gap-4 p-6 rounded-xl
                bg-[#f9fafb] shadow-sm border border-slate-100
                transition-all duration-300 ease-out
                hover:bg-[#041d29] hover:shadow-lg hover:-translate-y-1
              "
            >
              <div
                className="
                  flex-shrink-0 h-14 w-14 rounded-full
                  bg-blue-100 text-blue-700 flex items-center justify-center
                  shadow-md transition-all duration-300
                  group-hover:bg-white group-hover:text-[#041d29]
                "
              >
                {step.icon}
              </div>

              <div>
                <h5
                  className="
                    text-lg font-semibold text-slate-900 mb-1
                    transition-colors duration-300
                    group-hover:text-white
                  "
                >
                  {step.title}
                </h5>
                <p
                  className="
                    text-sm text-slate-600
                    transition-colors duration-300
                    group-hover:text-gray-200
                  "
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Application;
