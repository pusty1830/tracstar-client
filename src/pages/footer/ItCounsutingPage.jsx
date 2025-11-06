import React from "react";
import { Link } from "react-router-dom";

export default function ITConsulting() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001F3F] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-wider text-white/70 text-xs mb-3">
                Services · Tracstar Informatics
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                IT Consulting & Digital Transformation
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                Empower your business with modern IT strategy, architecture
                planning, and technology consulting to innovate and scale.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Tech Strategy",
                  "Architecture",
                  "Cloud Adoption",
                  "Security",
                  "DevOps",
                  "Digital Roadmap",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-white/10 border border-white/20 rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium shadow hover:bg-gray-100 transition"
                >
                  Book a Consultation
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition"
                >
                  View Services
                </a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "15+", v: "Industries" },
                    { k: "30+", v: "Consulting Projects" },
                    { k: "98%", v: "Client Satisfaction" },
                  ].map((i) => (
                    <div key={i.k} className="p-4 rounded-lg bg-white/5">
                      <div className="text-2xl font-semibold">{i.k}</div>
                      <div className="text-xs text-white/70">{i.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14"
      >
        <h2 className="text-2xl font-semibold">Consulting Services</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">
          We provide expert advisory to modernize IT systems, optimize
          workflows, and enhance digital capabilities.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Technology Strategy",
              desc: "Future-proof tech advisory aligned to your business vision.",
              points: [
                "Digital Roadmap",
                "Tech Stack Planning",
                "Innovation Strategy",
              ],
            },
            {
              title: "Enterprise Architecture",
              desc: "Design scalable and secure enterprise systems.",
              points: ["Cloud Architecture", "Microservices", "Data Strategy"],
            },
            {
              title: "Cloud Adoption",
              desc: "Accelerate cloud migration with minimal downtime.",
              points: ["AWS / Azure", "Cost Optimization", "Containerization"],
            },
            {
              title: "Security & Compliance",
              desc: "Ensure strong security posture and governance.",
              points: [
                "Risk Assessment",
                "Compliance Setup",
                "Cybersecurity Planning",
              ],
            },
            {
              title: "DevOps Consulting",
              desc: "Speed up releases with automation & CI/CD guidance.",
              points: ["Pipeline Setup", "Monitoring", "Automation"],
            },
            {
              title: "Business Process Automation",
              desc: "Improve efficiency with smart digital workflows.",
              points: ["AI Workflows", "RPA", "API Integrations"],
            },
          ].map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.desc}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#001F3F]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#001F3F] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">
                Transform your IT with confidence
              </h3>
              <p className="text-white/80 mt-1">
                Our experts are ready to guide your journey.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/contact"
                className="rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium hover:bg-gray-100"
              >
                Schedule Call
              </Link>
              <a
                href="#services"
                className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
