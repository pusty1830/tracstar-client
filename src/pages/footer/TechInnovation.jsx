import React from "react";
import { Link } from "react-router-dom";

export default function TechInnovation() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001F3F] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-wider text-white/70 text-xs mb-3">Tech & Innovation</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Innovating the future — today
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                We build with modern stacks, AI, and automation to help businesses move faster and stay ahead.
              </p>
              <div className="mt-8 flex gap-3">
                <Link to="/contact" className="inline-flex items-center rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium shadow hover:bg-gray-100 transition">Build With Us</Link>
                <a href="#innovations" className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition">Explore Innovations</a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "AI-first", v: "Strategy" },
                    { k: "Next-gen", v: "Tech Stack" },
                    { k: "R&D", v: "Focused" },
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

      {/* Innovations */}
      <section id="innovations" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">Innovation focus areas</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">We combine engineering, AI, automation, and design thinking.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { t: "AI & Automation", d: "ML models, AI agents, RPA, and real-time intelligence." },
            { t: "Modern Web Apps", d: "Micro-frontends, SSR/SSG, and high‑perf UX." },
            { t: "Cloud-Native", d: "Containers, observability, FinOps, serverless." },
            { t: "FinTech & Security", d: "Payment innovation, fraud control, encryption." },
          ].map((c) => (
            <div key={c.t} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-lg">{c.t}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Labs style section */}
      <section className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Experimentation & rapid prototyping</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              { t: "Tech Lab", d: "Testing emerging frameworks, tools, and architectures." },
              { t: "AI Playground", d: "Models, embeddings, RAG, AI‑driven workflows." },
              { t: "Customer Sandboxes", d: "Prototype fast, validate assumptions early." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="font-semibold">{c.t}</h3>
                <p className="text-sm text-gray-600 mt-1">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">Tech we believe in</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {["Next.js", "Node.js", "Python", "Docker", "Kubernetes", "AWS", "Razorpay"].map((t) => (
            <div key={t} className="text-sm text-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">{t}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-2xl bg-[#001F3F] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">Invent with confidence</h3>
            <p className="text-white/80 mt-1">Let’s build future‑ready experiences and platforms.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium hover:bg-gray-100">Start Innovation</Link>
            <a href="#innovations" className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10">Explore Focus Areas</a>
          </div>
        </div>
      </section>
    </div>
  );
}
