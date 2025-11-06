import React from "react";
import { Link } from "react-router-dom";

export default function Automation() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001F3F] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-wider text-white/70 text-xs mb-3">Services · Tracstar Informatics</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Automation & Intelligent Workflows
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                Eliminate repetitive work with RPA, integrations, and AI-powered automations that scale across teams.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["RPA", "APIs", "Webhooks", "iPaaS", "AI Agents", "Chatbots"].map((t) => (
                  <span key={t} className="text-xs bg-white/10 border border-white/20 rounded-full px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Link to="/contact" className="inline-flex items-center rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium shadow hover:bg-gray-100 transition">Get Automation Plan</Link>
                <a href="#usecases" className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition">View Use Cases</a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "70%", v: "Time Saved" },
                    { k: "0", v: "Manual Errors" },
                    { k: "< 2 wks", v: "PoC Delivery" },
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

      {/* Use Cases */}
      <section id="usecases" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">Automation use cases</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">Automate across sales, support, finance, and engineering.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Lead & CRM Sync", desc: "Auto-assign, enrich, and notify via CRM & chat.", points: ["HubSpot/Salesforce", "Scoring", "Alerts"] },
            { title: "Support Automation", desc: "Ticket triage, SLA alerts, and AI replies.", points: ["Zendesk/Freshdesk", "Bots", "Escalations"] },
            { title: "Finance Ops", desc: "Invoice parsing, payouts, and reconciliations.", points: ["Razorpay/Stripe", "Tally/Zoho", "Webhooks"] },
            { title: "Data Pipelines", desc: "Scheduled sync and transformations.", points: ["Airbyte/Fivetran", "dbt", "Warehousing"] },
            { title: "Dev Productivity", desc: "Release gates and notifications.", points: ["CI/CD", "Checks", "ChatOps"] },
            { title: "Internal Tools", desc: "Workflow apps to remove manual steps.", points: ["Low-code", "RBAC", "Audit Logs"] },
          ].map((c) => (
            <div key={c.title} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
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

      {/* Platforms */}
      <section className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Platforms & integrations</h2>
          <p className="text-gray-600 mt-2">We connect your tools end‑to‑end.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {["Zapier", "Make (Integromat)", "n8n", "Workato", "HubSpot", "Salesforce", "Razorpay", "Stripe", "Tally", "Zoho", "Slack", "Gmail"].map((t) => (
              <div key={t} className="text-sm text-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-2xl bg-[#001F3F] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">Automate your next bottleneck</h3>
            <p className="text-white/80 mt-1">We’ll ship a working PoC in under two weeks.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium hover:bg-gray-100">Start a PoC</Link>
            <a href="#usecases" className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10">Explore Use Cases</a>
          </div>
        </div>
      </section>
    </div>
  );
}
