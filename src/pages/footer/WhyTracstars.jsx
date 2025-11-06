import React from "react";
import { Link } from "react-router-dom";

export default function WhyTracstars() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001F3F] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-wider text-white/70 text-xs mb-3">Why Tracstars</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Outcomes over outputs. Partners, not vendors.
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                We combine senior engineering, product thinking, and a business-first approach to ship what actually moves the needle.
              </p>
              <div className="mt-8 flex gap-3">
                <Link to="/contact" className="inline-flex items-center rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium shadow hover:bg-gray-100 transition">Talk to Us</Link>
                <a href="#pillars" className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition">Our Pillars</a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "95%", v: "Projects On-Time" },
                    { k: "40+", v: "Products Shipped" },
                    { k: "98%", v: "Client Retention" },
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

      {/* Pillars */}
      <section id="pillars" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">What makes us different</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">Four pillars guide every engagement.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { t: "Senior Talent", d: "Leads and ICs with battle‑tested experience. Fewer people, more impact." },
            { t: "Product Mindset", d: "We prioritize outcomes, not ticket velocity. Clear KPIs and value delivery." },
            { t: "Quality by Design", d: "CICD, testing, and secure coding baked in—no surprise rewrites." },
            { t: "Ownership", d: "We operate like an internal team. Transparent comms, predictable cadence." },
          ].map((p) => (
            <div key={p.t} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-lg">{p.t}</h3>
              <p className="text-sm text-gray-600 mt-1">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Proof you can trust</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              { t: "Security & Compliance", d: "OWASP Top 10 practices, least-privilege, and regular audits as standard." },
              { t: "Architecture Reviews", d: "Cloud cost controls, resilience patterns, and vendor‑agnostic designs." },
              { t: "Transparent Delivery", d: "Roadmaps, sprint demos, and metrics—no black boxes." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="font-semibold">{c.t}</h3>
                <p className="text-sm text-gray-600 mt-1">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">What clients say</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {[
            { q: "They shipped our MVP in under a month without cutting corners.", a: "Founder, SaaS" },
            { q: "Clear roadmap, predictable sprints, and zero nasty surprises.", a: "CTO, Fintech" },
            { q: "Quality feels native to our team—codebase is a joy to maintain.", a: "Head of Eng, HealthTech" },
          ].map((t, i) => (
            <blockquote key={i} className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-700">“{t.q}”</p>
              <footer className="mt-3 text-xs text-gray-500">— {t.a}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Expertise badges</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {["AWS", "React", "Node.js", "Kubernetes", "Razorpay", "Power BI"].map((t) => (
              <div key={t} className="text-sm text-center rounded-lg border border-gray-200 bg-white px-3 py-2">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-2xl bg-[#001F3F] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">Ready to raise the bar?</h3>
            <p className="text-white/80 mt-1">Let's map value to milestones and start shipping.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium hover:bg-gray-100">Start a Conversation</Link>
            <a href="#pillars" className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10">See Pillars</a>
          </div>
        </div>
      </section>
    </div>
  );
}
