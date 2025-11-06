import React from "react";
import { Link } from "react-router-dom";

export default function SoftwareDevelopment() {
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
                Custom Software Development
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                We design, build, and scale Web, Mobile, and Cloud applications
                that are secure, maintainable, and built for growth.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Web Apps",
                  "Mobile Apps",
                  "SaaS",
                  "APIs",
                  "Cloud-Native",
                  "AI/ML",
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
                  Get a Quote
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition"
                >
                  Explore Capabilities
                </a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "40+", v: "Projects" },
                    { k: "99.9%", v: "Uptime Targets" },
                    { k: "< 4 wks", v: "MVP Launch" },
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
        <svg
          className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M39.7,-61.4C51.6,-53.3,61.9,-43,67.6,-30.6C73.2,-18.3,74.2,-3.9,71.3,9.1C68.5,22,61.9,33.4,52.7,44.6C43.4,55.9,31.6,67.1,18.3,70.7C5,74.3,-9.6,70.4,-24.1,65.6C-38.6,60.7,-52.9,55,-62.5,44.5C-72.1,34,-77.1,18.7,-78.7,2.5C-80.3,-13.7,-78.6,-30.9,-70.8,-44.4C-62.9,-58,-49,-68,-34.1,-74.1C-19.3,-80.2,-3.6,-82.5,9.6,-77.6C22.7,-72.7,33.8,-60.6,39.7,-61.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </section>

      {/* Capabilities */}
      <section
        id="capabilities"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14"
      >
        <h2 className="text-2xl font-semibold">What we build</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">
          End‑to‑end engineering across product, platform, and DevOps.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Web Applications",
              desc: "React, Next.js, Node.js, scalable APIs, and real-time features.",
              points: ["SPA/SSR", "REST & GraphQL APIs", "Microservices"],
            },
            {
              title: "Mobile Applications",
              desc: "React Native apps with native performance and OTA updates.",
              points: [
                "iOS & Android",
                "App Store / Play Deploy",
                "Offline-first",
              ],
            },
            {
              title: "Cloud & DevOps",
              desc: "AWS architecture, CI/CD, containers, observability, and cost control.",
              points: ["Docker/K8s", "Terraform", "Monitoring"],
            },
            {
              title: "Data & Integrations",
              desc: "ETL pipelines, analytics, payments, and 3rd‑party integrations.",
              points: ["Razorpay/Stripe", "Webhooks", "Data Warehousing"],
            },
            {
              title: "Quality & Security",
              desc: "Automated testing, audits, and best‑practice secure coding.",
              points: ["CICD QA gates", "OWASP Top 10", "SAST/DAST"],
            },
            {
              title: "Product Acceleration",
              desc: "MVPs, PoCs, and roadmap delivery with clear metrics.",
              points: ["MVP in weeks", "Velocity tracking", "A/B experiments"],
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

      {/* Tech Stack */}
      <section className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Tech stack we love</h2>
          <p className="text-gray-600 mt-2">
            Battle‑tested technologies for modern products.
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              "React",
              "Next.js",
              "Node.js",
              "Express",
              "NestJS",
              "MySQL",
              "PostgreSQL",
              "MongoDB",
              "Redis",
              "Docker",
              "Kubernetes",
              "AWS",
              "Razorpay",
              "Stripe",
            ].map((t) => (
              <div
                key={t}
                className="text-sm text-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">How we deliver</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-5">
          {[
            { t: "Discover", d: "Workshops, requirements, success metrics." },
            { t: "Design", d: "UX flows, wireframes, architecture." },
            { t: "Develop", d: "Agile sprints, reviews, CI/CD." },
            { t: "Scale", d: "Monitoring, optimization, roadmap." },
          ].map((s, idx) => (
            <div
              key={s.t}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="text-[#001F3F] text-sm font-semibold">
                Step {idx + 1}
              </div>
              <h3 className="font-semibold text-lg">{s.t}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Models */}
      <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-semibold">Engagement models</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              {
                t: "Fixed Scope",
                d: "Clear deliverables, timeline, and cost—perfect for MVPs.",
                cta: "Request Estimate",
              },
              {
                t: "Time & Material",
                d: "Flexible scope with sprint-based billing—ideal for evolving products.",
                cta: "Talk to Team",
              },
              {
                t: "Dedicated Team",
                d: "Cross‑functional squad embedded with you for long‑term velocity.",
                cta: "Hire a Squad",
              },
            ].map((m) => (
              <div
                key={m.t}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <h3 className="font-semibold text-lg">{m.t}</h3>
                <p className="text-sm text-gray-600 mt-1">{m.d}</p>
                <Link
                  to="/contact"
                  className="inline-flex mt-4 items-center rounded-lg bg-[#001F3F] text-white px-4 py-2 text-sm font-medium hover:bg-[#002b60]"
                >
                  {m.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="mt-6 divide-y divide-gray-200 bg-white border border-gray-200 rounded-xl">
          {[
            {
              q: "How fast can you launch an MVP?",
              a: "Most MVPs ship in 3–6 weeks depending on scope. We align on must‑haves first.",
            },
            {
              q: "Do you sign NDAs and provide SOWs?",
              a: "Yes. We’re comfortable with NDAs, MoUs, and detailed Statements of Work.",
            },
            {
              q: "What about maintenance after launch?",
              a: "We offer support SLAs, monitoring, and iterative roadmap delivery.",
            },
            {
              q: "Can you integrate Razorpay or other payments?",
              a: "Absolutely—Razorpay, Stripe, subscription billing, and webhook‑based workflows.",
            },
          ].map((f, i) => (
            <details
              key={f.q}
              className={`group p-5 ${i !== 0 ? "" : "rounded-t-xl"}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="font-medium">{f.q}</span>
                <span className="ml-4 text-[#001F3F]">＋</span>
              </summary>
              <p className="mt-2 text-sm text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-2xl bg-[#001F3F] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">
                Build faster with Tracstar
              </h3>
              <p className="text-white/80 mt-1">
                Let’s scope your MVP or next milestone this week.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/contact"
                className="rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium hover:bg-gray-100"
              >
                Start a Project
              </Link>
              <a
                href="#capabilities"
                className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10"
              >
                View Capabilities
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
