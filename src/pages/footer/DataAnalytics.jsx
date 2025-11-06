import React from "react";
import { Link } from "react-router-dom";

export default function DataAnalytics() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001F3F] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-wider text-white/70 text-xs mb-3">Services · Tracstar Informatics</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Data Analytics & Insights
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                Turn data into decisions with modern pipelines, BI dashboards, and ML models tailored to your business.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["ETL", "Warehousing", "BI", "ML", "Real-time", "Data Viz"].map((t) => (
                  <span key={t} className="text-xs bg-white/10 border border-white/20 rounded-full px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Link to="/contact" className="inline-flex items-center rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium shadow hover:bg-gray-100 transition">Request Demo</Link>
                <a href="#solutions" className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition">See Solutions</a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "10x", v: "Faster Reports" },
                    { k: "95%", v: "Data Accuracy" },
                    { k: "3-6 wks", v: "Dashboard Go-Live" },
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

      {/* Solutions */}
      <section id="solutions" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">Analytics solutions</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">From raw data to executive dashboards, we build end-to-end analytics platforms.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Data Engineering", desc: "Ingest, clean, and model enterprise data.", points: ["ETL/ELT", "dbt/Lakehouse", "Batch & Streaming"] },
            { title: "Data Warehousing", desc: "Centralize single source of truth.", points: ["Snowflake/BigQuery", "Redshift", "Partitioning"] },
            { title: "Business Intelligence", desc: "Actionable dashboards & self-serve analytics.", points: ["Power BI / Looker", "KPI Suites", "Row-level Security"] },
            { title: "Machine Learning", desc: "Forecasts, recommendations, and NLP.", points: ["Classification/Reg", "Time Series", "MLOps"] },
            { title: "Real-time Analytics", desc: "Stream processing for instant insights.", points: ["Kafka/Kinesis", "OLAP", "Alerting"] },
            { title: "Data Governance", desc: "Quality, lineage, and access controls.", points: ["Cataloging", "DQ Rules", "PII Masking"] },
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

      {/* Tooling */}
      <section className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Tools & platforms</h2>
          <p className="text-gray-600 mt-2">Pick the stack you prefer — we’ll make it sing.</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {["Power BI", "Looker", "Tableau", "Snowflake", "BigQuery", "Redshift", "dbt", "Airflow", "Kafka", "Spark"].map((t) => (
              <div key={t} className="text-sm text-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-2xl bg-[#001F3F] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">See your KPIs in one place</h3>
            <p className="text-white/80 mt-1">We’ll ship your first dashboard in weeks, not months.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium hover:bg-gray-100">Start Now</Link>
            <a href="#solutions" className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10">Explore Solutions</a>
          </div>
        </div>
      </section>
    </div>
  );
}
