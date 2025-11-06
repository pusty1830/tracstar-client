import React from "react";
import { Link } from "react-router-dom";

export default function OurSolutions() {
  const solutionAreas = [
    {
      t: "Digital Commerce",
      d: "Storefronts, carts, payments, subscriptions, and order management.",
      p: ["Headless storefronts", "Razorpay/Stripe", "Subscriptions"],
      to: "/software-development",
    },
    {
      t: "Fintech Platforms",
      d: "KYC, payouts, reconciliation, ledgers, and risk controls.",
      p: ["UPI/Payouts", "KYC/KYB", "Reconciliation"],
      to: "/automation",
    },
    {
      t: "Education Tech",
      d: "LMS, live classes, assessments, results, and proctoring.",
      p: ["LMS", "Live lessons", "Assessments"],
      to: "/data-analytics",
    },
    {
      t: "Hospitality & OTA",
      d: "Booking engines, PMS, channel manager, B2B/B2C portals.",
      p: ["PMS", "Inventory sync", "Partner portals"],
      to: "/cloud-solutions",
    },
    {
      t: "Operations Automation",
      d: "RPA & iPaaS to remove manual steps across teams.",
      p: ["Zapier/Make", "n8n", "APIs/Webhooks"],
      to: "/automation",
    },
    {
      t: "Analytics & BI",
      d: "Pipelines, data lake/warehouse, dashboards, and ML.",
      p: ["Power BI", "dbt/ETL", "Forecasting"],
      to: "/data-analytics",
    },
  ];

  const outcomes = [
    { k: "3–6 wks", v: "MVP Launch" },
    { k: "60%", v: "Cloud Cost Savings" },
    { k: "10x", v: "Faster Reporting" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001F3F] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-wider text-white/70 text-xs mb-3">
                Tracstar Informatics
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Our Solutions
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                Discover how we combine software, cloud, data, and automation to
                ship outcomes — not just outputs.
              </p>
              <div className="mt-8 flex gap-3">
                <a
                  href="#solutions"
                  className="inline-flex items-center rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium shadow hover:bg-gray-100 transition"
                >
                  Explore Solutions
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition"
                >
                  Talk to Team
                </Link>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {outcomes.map((i) => (
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

      {/* Solution Cards */}
      <section
        id="solutions"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14"
      >
        <h2 className="text-2xl font-semibold">Solution areas</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Pre-baked blueprints you can customize and deploy fast.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutionAreas.map((s) => (
            <div
              key={s.t}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <h3 className="font-semibold text-lg">{s.t}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.d}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {s.p.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#001F3F]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link
                  to={s.to}
                  className="inline-flex items-center rounded-lg bg-[#001F3F] text-white px-4 py-2 text-sm font-medium hover:bg-[#002b60]"
                >
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Our approach</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              {
                t: "Blueprints",
                d: "Reference architectures to start fast with lower risk.",
              },
              {
                t: "Modular Delivery",
                d: "Roadmap into value-focused milestones.",
              },
              {
                t: "Production Ready",
                d: "Security, testing, and CI/CD from day one.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-xl border border-gray-200 bg-gray-50 p-6"
              >
                <h3 className="font-semibold">{c.t}</h3>
                <p className="text-sm text-gray-600 mt-1">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-2xl bg-[#001F3F] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">
              Let’s match a solution to your goals
            </h3>
            <p className="text-white/80 mt-1">
              Pick a blueprint or start with a discovery workshop.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium hover:bg-gray-100"
            >
              Talk to Team
            </Link>
            <a
              href="#solutions"
              className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10"
            >
              Explore Solutions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
