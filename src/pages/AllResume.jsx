import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllResumes } from "../services/services";
import { getUserId } from "../services/axiosClient";

/**
 * ResumeCards.jsx
 * Modern card layout for resumes using Tailwind CSS only.
 */

export default function ResumeCards() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      try {
        const payLoad = {
          data: { filter: "", userId: getUserId() },
          page: 0,
          pageSize: 1000,
          order: [["createdAt", "DESC"]],
        };
        const res = await getAllResumes(payLoad);
        const mapped = (res?.data?.data?.rows || []).map(mapResumeFromBackend);
        setResumes(mapped);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
        setError(
          err?.response?.data?.message || err?.message || "Failed to load resumes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Resumes</h2>

      {loading && <GridSkeleton columns={3} />}

      {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {resumes.map((r) => (
            <article
              key={r.id}
              className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex flex-col"
              aria-labelledby={`resume-${r.id}-name`}
            >
              <div className="flex items-start gap-4">
                <Avatar name={r.name} />
                <div className="min-w-0 flex-1">
                  <h3
                    id={`resume-${r.id}-name`}
                    className="flex items-center text-lg font-medium text-slate-900"
                  >
                    <span className="truncate">{r.name}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      {r.title ? `• ${r.title}` : ""}
                    </span>
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 truncate">{r.summary}</p>

                  <div className="mt-3 text-xs text-gray-500 flex flex-wrap gap-2">
                    {r.location && (
                      <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-gray-50 border text-[11px]">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="9" r="2.2" fill="currentColor"/>
                        </svg>
                        <span className="truncate max-w-[9rem]">{r.location}</span>
                      </span>
                    )}

                    {r.email && (
                      <a
                        href={`mailto:${r.email}`}
                        className="inline-flex items-center gap-2 px-2 py-1 rounded bg-gray-50 border text-[11px] truncate max-w-[10rem]"
                      >
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 8.5L12 13 3 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="truncate">{r.email}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* right-side small actions */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => navigate(`/resume/${r.id}`)}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-sm hover:brightness-95 transition"
                    aria-label={`View resume for ${r.name}`}
                  >
                    View
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M15 12H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15l3-3-3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {r.website ? (
                    <a
                      href={r.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-gray-600 px-2 py-1 rounded border hover:bg-gray-50"
                    >
                      Website
                    </a>
                  ) : (
                    <button
                      onClick={() => navigate(`/resume/${r.id}`)}
                      className="text-xs text-gray-400 px-2 py-1 rounded border cursor-default"
                      disabled
                      aria-hidden
                    >
                      No Site
                    </button>
                  )}
                </div>
              </div>

              {/* skills & meta at bottom */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(r.skills) && r.skills.slice(0, 4).map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-gray-50 border rounded-full truncate max-w-[9rem]"
                    >
                      {s}
                    </span>
                  ))}

                  {Array.isArray(r.skills) && r.skills.length > 4 && (
                    <span className="px-2 py-1 text-xs bg-gray-50 border rounded-full">+{r.skills.length - 4}</span>
                  )}
                </div>

                <div className="text-xs text-gray-400">
                  {r.experience && r.experience.length > 0 ? `${r.experience.length} exp` : "No exp"}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- small helper components ---------- */

function Avatar({ name }) {
  const initials = (name || "U").split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
  return (
    <div className="flex-shrink-0">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center font-semibold text-white text-lg"
        style={{
          background: "linear-gradient(135deg,#2563eb,#06b6d4)",
          boxShadow: "0 4px 10px rgba(6,8,15,0.06)",
        }}
        aria-hidden
      >
        {initials || "U"}
      </div>
    </div>
  );
}

/* Simple skeleton while loading */
function GridSkeleton({ columns = 3 }) {
  const items = new Array(columns * 2).fill(0);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {items.map((_, i) => (
        <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-2xl p-4">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
          <div className="mt-4 h-8 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

/* ---------- mapper preserved from your original code ---------- */

function mapResumeFromBackend(row) {
  const personal = row.personal || {};

  const experience = Array.isArray(row.experience)
    ? row.experience.map((e) => ({
        role: e.role || e.position || e.title || "",
        company: e.company || e.employer || "",
        period: e.period || `${e.from || ""} - ${e.to || ""}`,
        bullets:
          e.bullets ||
          e.responsibilities ||
          (e.description ? [e.description] : []),
      }))
    : [];

  const education = Array.isArray(row.education)
    ? row.education.map((ed) => ({
        degree: ed.degree || ed.course || "",
        school: ed.school || ed.institution || "",
        period: ed.period || `${ed.from || ""} - ${ed.to || ""}`,
        extra: ed.extra || ed.grade || ed.cgpa || "",
      }))
    : [];

  const projects = Array.isArray(row.projects)
    ? row.projects.map((p) => ({
        name: p.name || p.title || "",
        url: p.url || p.link || "",
        desc: p.desc || p.description || "",
      }))
    : [];

  const skills = Array.isArray(row.skills) ? row.skills : [];

  return {
    id: row.id,
    userId: row.userId,
    name: personal.name || personal.fullName || "Unknown",
    title: personal.title || personal.profession || "",
    email: personal.email || "",
    phone: personal.phone || personal.contact || "",
    location: personal.address || personal.location || "",
    website: personal.website || "",
    linkedin: personal.linkedin || "",
    github: personal.github || "",
    summary: personal.summary || personal.bio || "",
    skills,
    education,
    experience,
    projects,
  };
}
