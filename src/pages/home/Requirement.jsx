import React from "react";
import { Link } from "react-router-dom"; // 👈 Add this
import {
  FiRefreshCw,
  FiUserPlus,
  FiUsers,
  FiBookOpen,
  FiLayers,
} from "react-icons/fi";

const Recruitment = () => {
  const solutions = [
    {
      icon: FiRefreshCw,
      title: "Smart Job Matching",
      desc: "Our intelligent system connects job seekers with the right companies, ensuring faster and more accurate hiring.",
      button: "FIND TALENT",
      link: "/coming-soon", // 👈 your desired page
    },
    { center: true },
    {
      icon: FiUserPlus,
      title: "Verified Candidates",
      desc: "Access a pool of verified job seekers with complete profiles and AI-optimized resumes for your open roles.",
      button: "BROWSE CANDIDATES",
      link: "/coming-soon",
    },
    {
      icon: FiUsers,
      title: "Diversity & Inclusion",
      desc: "Promote workplace equality by reaching skilled and diverse talent across industries and regions.",
      button: "HIRE DIVERSE TALENT",
      link: "/coming-soon",
    },
    {
      icon: FiBookOpen,
      title: "Resume Builder & Training",
      desc: "Help job seekers shine with AI-powered resume creation and skill development programs tailored to their goals.",
      button: "START BUILDING",
      link: "/resume-builder",
    },
    {
      icon: FiLayers,
      title: "End-to-End Recruitment",
      desc: "From candidate sourcing to onboarding, Tracstars Informatics simplifies and accelerates the hiring process.",
      button: "START HIRING",
      link: "/coming-soon",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
          Recruitment Solutions
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mx-auto mb-10">
          Tracstars Informatics bridges the gap between talent and opportunity.
          Explore intelligent hiring solutions designed to help businesses grow
          and candidates thrive.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-stretch">
          {solutions.map((item, index) => (
            <div key={index} className="flex justify-center">
              {item.center ? (
                <div className="w-full h-full rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-center p-10">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                    <span className="text-slate-900">Tracstars</span>{" "}
                    <span className="text-blue-600">Informatics</span>
                  </h3>
                </div>
              ) : (
                <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 md:p-8 text-center shadow-sm hover:shadow-md transition">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-700 shadow">
                    {item.icon && <item.icon size={28} aria-hidden="true" />}
                  </div>
                  <h5 className="text-lg font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h5>
                  <p className="text-sm text-slate-600 mb-5">{item.desc}</p>
                  {item.button && item.link && (
                    <Link
                      to={item.link}
                      className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      {item.button}
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recruitment;
