import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
  const coreServices = [
    {
      icon: "🧰",
      title: "Software Development",
      desc: "Full‑stack web & mobile apps, APIs, and platforms.",
      to: "/software-development",
      bullets: ["React/Next.js", "Node/Nest", "MySQL/MongoDB"],
    },
    {
      icon: "🧭",
      title: "IT Consulting",
      desc: "Technology strategy, architecture, and delivery coaching.",
      to: "/it-consulting",
      bullets: ["Architecture", "DevOps", "Security"],
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      desc: "AWS/Azure migration, Kubernetes, serverless, FinOps.",
      to: "/cloud-solutions",
      bullets: ["K8s", "Terraform", "Observability"],
    },
    {
      icon: "📊",
      title: "Data Analytics",
      desc: "Pipelines, warehousing, BI dashboards, and ML.",
      to: "/data-analytics",
      bullets: ["ETL/ELT", "Power BI", "Snowflake/BigQuery"],
    },
    {
      icon: "🤖",
      title: "Automation",
      desc: "RPA, iPaaS, AI agents, and workflow orchestration.",
      to: "/automation",
      bullets: ["Zapier/Make", "n8n", "APIs/Webhooks"],
    },
  ];

  const talentServices = [
    {
      icon: "📝",
      title: "Resume Builder",
      desc: "Beautiful, ATS‑friendly resumes with PDF export and templates.",
      bullets: ["Live preview", "Templates", "Json→PDF"],
      cta: { label: "Open Builder", to: "/resume-builder" },
    },
    {
      icon: "🎯",
      title: "Placement Coordinator",
      desc: "Central hub for placements: track openings, applicants, & drives.",
      bullets: ["Company drives", "Eligibility rules", "Shortlisting"],
      cta: { label: "See Console", to: "/placements" },
    },
    {
      icon: "💼",
      title: "Job Platform & Posting",
      desc: "Post jobs, collect applicants, and auto‑route to recruiters.",
      bullets: ["Job board", "Application forms", "Email/WhatsApp alerts"],
      cta: { label: "Post a Job", to: "/jobs/new" },
    },
    {
      icon: "📑",
      title: "Applicant Tracking (ATS)",
      desc: "Kanban pipelines, interview rounds, offers, and notes.",
      bullets: ["Stages", "Bulk actions", "Tags/filters"],
      cta: { label: "View ATS", to: "/ats" },
    },
    {
      icon: "🧪",
      title: "Assessments & Interviews",
      desc: "MCQ/coding tests, scheduling, interview feedback, and scoring.",
      bullets: ["Proctoring", "Code tests", "Scorecards"],
      cta: { label: "Create Test", to: "/assessments" },
    },
    {
      icon: "🧭",
      title: "Career Portal",
      desc: "Student/Alumni portal for resumes, jobs, and referrals.",
      bullets: ["Student login", "Alumni referral", "Email digests"],
      cta: { label: "Open Portal", to: "/career" },
    },
  ];

  const integrationServices = [
    {
      icon: "💳",
      title: "Payments & Billing",
      desc: "Collect fees, subscriptions, and payouts via Razorpay/Stripe.",
      bullets: ["One‑time & Subscriptions", "Invoices", "GST support"],
    },
    {
      icon: "🔗",
      title: "Integrations",
      desc: "Seamless connections with CRMs, LMS, and internal tools.",
      bullets: ["HubSpot", "Zoho", "Slack/Gmail"],
    },
    {
      icon: "🛡️",
      title: "Security & Compliance",
      desc: "Best‑practice auth, RBAC, audits, and data protection.",
      bullets: ["JWT/SAML", "OWASP", "PII masking"],
    },
    {
      icon: "🛠️",
      title: "Support & Maintenance",
      desc: "SLAs, monitoring, bug‑fixes, enhancements, and L2 support.",
      bullets: ["Uptime SLAs", "On‑call", "Change requests"],
    },
    {
      icon: "🎓",
      title: "Training & Enablement",
      desc: "Workshops for students, recruiters, and admins.",
      bullets: ["Onboarding", "Playbooks", "Video guides"],
    },
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
                Our Services
              </h1>
              <p className="mt-4 text-white/80 max-w-2xl">
                End‑to‑end product delivery plus a complete placements & careers
                suite — built on a modern, secure stack.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  to="#talent"
                  className="inline-flex items-center rounded-lg bg-white text-[#001F3F] px-5 py-3 font-medium shadow hover:bg-gray-100 transition"
                >
                  Placements Suite
                </Link>
                <a
                  href="#core"
                  className="inline-flex items-center rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10 transition"
                >
                  Engineering
                </a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { k: "9+", v: "Core Offerings" },
                    { k: "40+", v: "Projects" },
                    { k: "98%", v: "Satisfaction" },
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

      {/* Core Engineering */}
      <section
        id="core"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14"
      >
        <h2 className="text-2xl font-semibold">Core engineering</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Modern software, secure by default, designed to scale.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreServices.map((svc) => (
            <div
              key={svc.title}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="text-2xl">{svc.icon}</div>
              <h3 className="font-semibold text-lg mt-2">{svc.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{svc.desc}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {svc.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#001F3F]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link
                  to={svc.to}
                  className="inline-flex items-center rounded-lg bg-[#001F3F] text-white px-4 py-2 text-sm font-medium hover:bg-[#002b60]"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Placements & Careers Suite */}
      <section id="talent" className="bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Placements & careers suite</h2>
          <p className="text-gray-600 mt-2 max-w-3xl">
            Everything needed to run student placements and employer recruiting
            in one place.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {talentServices.map((svc) => (
              <div
                key={svc.title}
                className="bg-gray-50 rounded-xl border border-gray-200 p-6"
              >
                <div className="text-2xl">{svc.icon}</div>
                <h3 className="font-semibold text-lg mt-2">{svc.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{svc.desc}</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {svc.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#001F3F]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {svc.cta && (
                  <div className="mt-4">
                    <Link
                      to={svc.cta.to}
                      className="inline-flex items-center rounded-lg bg-[#001F3F] text-white px-4 py-2 text-sm font-medium hover:bg-[#002b60]"
                    >
                      {svc.cta.label}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations & Ops */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-semibold">Integrations & operations</h2>
        <p className="text-gray-600 mt-2 max-w-3xl">
          Payments, security, support, and enablement to keep things running
          smoothly.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {integrationServices.map((svc) => (
            <div
              key={svc.title}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="text-2xl">{svc.icon}</div>
              <h3 className="font-semibold text-lg mt-2">{svc.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{svc.desc}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {svc.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#001F3F]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-[#001F3F] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">
              Let’s pick the right starting point
            </h3>
            <p className="text-white/80 mt-1">
              We can scope an MVP, streamline placements, or integrate your
              tools.
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
              href="#core"
              className="rounded-lg border border-white/30 px-5 py-3 font-medium hover:bg-white/10"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
