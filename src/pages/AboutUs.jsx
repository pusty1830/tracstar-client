import React from "react";
// 👈 Replace with your actual about image

const AboutPage = () => {
  return (
    <div className="font-[Inter] bg-white min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-24 text-white"
        style={{
          backgroundColor: "#041d29",
        }}
      >
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About Tracstars Informatics
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Empowering job seekers and employers through technology, talent, and
            trust.
          </p>
        </div>
      </section>

      {/* About Text Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Text */}
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Who We Are
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              <strong>Tracstars Informatics</strong> is a next-generation job
              platform built to bridge the gap between **talent and
              opportunity**. Our mission is to make hiring simpler, faster, and
              smarter using modern technology and data-driven insights.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              We empower job seekers to showcase their skills through AI-powered
              resumes and help employers connect with the right talent —
              efficiently and transparently. Our platform is built to serve
              individuals, startups, and enterprises alike.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Today, we’ve helped **thousands of professionals** get closer to
              their dream careers and supported companies in finding top talent.
              And this is just the beginning 🚀.
            </p>
          </div>

          {/* Right Side: Stats or Image */}
          <div className="bg-slate-50 p-6 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Our Impact So Far
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b pb-2 text-slate-700">
                <span>🎯 Active Job Seekers</span>
                <span className="font-semibold">200K+</span>
              </li>
              <li className="flex justify-between border-b pb-2 text-slate-700">
                <span>🏢 Companies Hiring</span>
                <span className="font-semibold">15K+</span>
              </li>
              <li className="flex justify-between border-b pb-2 text-slate-700">
                <span>📄 AI Resumes Built</span>
                <span className="font-semibold">75K+</span>
              </li>
              <li className="flex justify-between text-slate-700">
                <span>🌍 Jobs Matched</span>
                <span className="font-semibold">500K+</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-10">
            Our Vision & Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                🌟 Vision
              </h3>
              <p className="text-slate-600">
                To become India’s most trusted platform where job seekers find
                meaningful opportunities and employers discover the best talent
                effortlessly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                🚀 Mission
              </h3>
              <p className="text-slate-600">
                To simplify hiring using technology — connecting people with
                opportunities faster while ensuring quality, trust, and
                accessibility for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Join Tracstars Informatics Today
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-8">
          Whether you're a job seeker or an employer, we're here to help you
          grow. Start building your future with us today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/resume-builder"
            className="inline-block bg-slate-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Build My Resume (₹51)
          </a>
          <a
            href="/find-jobs"
            className="inline-block border border-slate-900 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-slate-900 hover:text-white transition"
          >
            Find a Job
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
