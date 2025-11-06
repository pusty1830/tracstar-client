import React from "react";
import { Link } from "react-router-dom";

export default function CloudSolutions() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#001F3F] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-wider text-white/70 text-xs mb-3">Services · Tracstar Informatics</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Cloud Solutions & Modernization
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                Design, migrate, and optimize on the cloud with secure, scalable architectures across AWS, Azure, and GCP.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["AWS", "Azure", "GCP", "Serverless", "Containers", "DevOps"].map((t) => (
                  <span key={t} className="text-xs bg-white/10 border border-white/20 rounded-full px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Link to="/contact" className="inline-flex items-center rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium shadow hover:bg-gray-100 transition">Get Cloud Estimate</Link>
                <a href="#services" className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition">Explore Services</a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "100k+", v: "Users Served" },
                    { k: "60%", v: "Cost Savings" },
                    { k: "24x7", v: "Monitoring" },
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
      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">Cloud Services</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">We help you adopt, migrate, and run reliably in the cloud with security and cost-efficiency.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "Cloud Readiness", desc: "Assess workloads and build a migration roadmap.", points: ["ROI & TCO", "Risk Analysis", "Target Arch"] },
            { title: "Migration", desc: "Lift-and-shift or re-architect to cloud-native.", points: ["Rehost/Refactor", "Data Migration", "Cutover Plan"] },
            { title: "DevOps & CI/CD", desc: "Automate deployments and infrastructure.", points: ["Pipelines", "IaC (Terraform)", "Observability"] },
            { title: "Kubernetes & Containers", desc: "Portable, scalable app runtimes.", points: ["EKS/AKS/GKE", "Service Mesh", "Autoscaling"] },
            { title: "Serverless", desc: "Pay-per-use architectures for bursty workloads.", points: ["Lambda/Functions", "Event-Driven", "APIGateway"] },
            { title: "Security & Cost", desc: "Governance, policies, and FinOps.", points: ["CSPM", "WAF & IAM", "Cost Controls"] },
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

      {/* Reference Architectures */}
      <section className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Reference architectures</h2>
          <p className="text-gray-600 mt-2">Proven blueprints for secure, scalable systems.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: "SaaS on AWS", d: "Multi-tenant with Cognito, RDS, and ECS/EKS." },
              { t: "Event-driven", d: "Serverless pipelines with SQS/SNS/Kinesis." },
              { t: "Data Lake", d: "S3-based lakehouse with Glue & Athena." },
            ].map((a) => (
              <div key={a.t} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <h3 className="font-semibold">{a.t}</h3>
                <p className="text-sm text-gray-600 mt-1">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-2xl bg-[#001F3F] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">Migrate with zero drama</h3>
            <p className="text-white/80 mt-1">Get a phased plan with rollback and cost guardrails.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium hover:bg-gray-100">Start Migration</Link>
            <a href="#services" className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10">Explore Services</a>
          </div>
        </div>
      </section>
    </div>
  );
}
