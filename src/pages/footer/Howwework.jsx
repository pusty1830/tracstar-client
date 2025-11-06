import React from "react";
import { Link } from "react-router-dom";

export default function HowWeWork() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001F3F] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-wider text-white/70 text-xs mb-3">How We Work</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Process that delivers — every time.
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                Clear communication, predictable sprints, and measurable outcomes.
                We work as an extension of your team — transparent, iterative, and aligned.
              </p>
              <div className="mt-8 flex gap-3">
                <Link to="/contact" className="inline-flex items-center rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium shadow hover:bg-gray-100 transition">Start With Us</Link>
                <a href="#process" className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition">Our Workflow</a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "2 wks", v: "Avg. Sprint" },
                    { k: "Daily", v: "Syncs" },
                    { k: "100%", v: "Transparency" },
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

      {/* Process */}
      <section id="process" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">Our 4‑Stage Delivery Framework</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Efficiency meets clarity — we ensure consistent delivery from day one.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { t: "Discover", d: "Workshops, requirement deep‑dives, risk mapping, success metrics." },
            { t: "Design", d: "UX flows, architecture diagrams, API contracts, sprint planning." },
            { t: "Develop", d: "Agile delivery, code reviews, CI/CD, weekly demos, QA automation." },
            { t: "Scale", d: "Observability, cost optimization, playbooks, continuous improvement." },
          ].map((p, idx) => (
            <div key={p.t} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-[#001F3F] text-sm font-semibold">Step {idx + 1}</div>
              <h3 className="font-semibold text-lg">{p.t}</h3>
              <p className="text-sm text-gray-600 mt-1">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Transparency */}
      <section className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">How we stay aligned</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              { t: "Live Dashboards", d: "Burndown charts, sprint reports, deployment metrics." },
              { t: "Code Quality", d: "Automated testing, CI/CD gates, security scanning." },
              { t: "Constant Feedback", d: "Weekly demos, async updates, rapid iteration." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="font-semibold">{c.t}</h3>
                <p className="text-sm text-gray-600 mt-1">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">Tools we rely on</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">Tech & communication stack for smooth execution.</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {["Jira", "Slack", "Notion", "Github", "Figma", "Docker"].map((t) => (
            <div key={t} className="text-sm text-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">{t}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-2xl bg-[#001F3F] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">Build fast. Build right.</h3>
            <p className="text-white/80 mt-1">Plug our team into your workflow or let us run the delivery engine.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium hover:bg-gray-100">Work With Us</Link>
            <a href="#process" className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10">See Process</a>
          </div>
        </div>
      </section>
    </div>
  );
}
