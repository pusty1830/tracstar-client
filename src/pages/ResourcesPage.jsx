import React from "react";
import { Link } from "react-router-dom";
import { resourcesData } from "../components/data";

const Resource = ({ isHome = false }) => {
  const displayedResources = isHome ? resourcesData.slice(0, 3) : resourcesData;

  return (
    <>
      {/* ===== Header Section (Only show if NOT home) ===== */}
      {!isHome && (
        <section
          className="relative bg-cover bg-center bg-no-repeat py-24 text-white"
          style={{
            backgroundColor: "#041d29",
          }}
        >
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Resources
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Explore hiring insights, job market reports, and expert career tips.
            </p>
          </div>
        </section>
      )}

      {/* ===== Resource Grid Section ===== */}
      <section className="py-16 font-[Inter] bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {displayedResources.map((item) => (
            <Link
              to={`/resources/${item.id}`}
              key={item.id}
              className="flex flex-col rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-xl transition-transform hover:-translate-y-1 duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
              <div className="flex flex-col p-5 h-full">
                <span className="uppercase mb-3 px-3 py-1 bg-[#E6F4FF] text-[#0073E6] text-xs font-medium rounded-full w-fit">
                  {item.type}
                </span>
                <h5 className="text-slate-900 text-[1.1rem] font-semibold leading-snug mb-4">
                  {item.title}
                </h5>
                <div className="mt-auto text-right">
                  <span className="inline-flex items-center text-[#0073E6] font-semibold text-sm hover:underline">
                    READ MORE
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="ml-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.498.498 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button — only show on Home */}
        {isHome && (
          <div className="text-center mt-10">
            <Link
              to="/resources"
              className="inline-block px-6 py-2 border border-slate-900 rounded-full text-sm font-semibold text-slate-900 hover:bg-slate-900 hover:text-white transition"
            >
              VIEW MORE
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Resource;
