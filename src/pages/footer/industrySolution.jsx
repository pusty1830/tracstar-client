import React from "react";
import { Link } from "react-router-dom";

export default function IndustrySolutions() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001F3F] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-wider text-white/70 text-xs mb-3">
                Industry Solutions
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Tailored solutions for every industry
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                From SaaS startups to enterprise platforms — we build scalable,
                secure, and future‑ready products across industries.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium shadow hover:bg-gray-100 transition"
                >
                  Speak With Experts
                </Link>
                <a
                  href="#industries"
                  className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition"
                >
                  View Industries
                </a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "8+", v: "Industries" },
                    { k: "40+", v: "Products Delivered" },
                    { k: "5x", v: "Avg ROI" },
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

      {/* Industry Grid */}
      <section
        id="industries"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14"
      >
        <h2 className="text-2xl font-semibold">Industries we empower</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Battle‑tested solutions for complex industry needs.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              t: "Fintech",
              d: "Payments, lending, KYC, UPI, RBI compliant systems.",
            },
            {
              t: "EdTech",
              d: "Learning platforms, live classrooms, LMS, exams.",
            },
            {
              t: "HealthTech",
              d: "EMR, teleconsultation, HIPAA‑ready workflows.",
            },
            {
              t: "Hospitality",
              d: "OTA platforms, booking engines, PMS, channel sync.",
            },
            {
              t: "Retail & E‑Commerce",
              d: "Multi‑vendor, logistics, POS, inventory systems.",
            },
            {
              t: "SaaS & Platforms",
              d: "Multi‑tenant SaaS, billing, subscription engines.",
            },
          ].map((c) => (
            <div
              key={c.t}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <h3 className="font-semibold text-lg">{c.t}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies preview */}
      <section className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Case study snapshots</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              {
                t: "Fintech Automation",
                d: "Automated KYC + payouts, 3x onboarding speed.",
              },
              {
                t: "EdTech Live LMS",
                d: "Scaled to 50k students with real‑time classes.",
              },
              {
                t: "Hospitality OTA",
                d: "Booking engine + PMS + channel manager suite.",
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
              Bring industry expertise to your product
            </h3>
            <p className="text-white/80 mt-1">
              Let’s plan a solution tailored for your domain.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium hover:bg-gray-100"
            >
              Start Consultation
            </Link>
            <a
              href="#industries"
              className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10"
            >
              View Industries
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
