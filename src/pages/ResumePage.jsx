import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResumeById } from "../services/services";
import JsonToPdfResumeSingleCol_WithFonts_UI from "./ResumeSample";


export default function ResumePage() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await getResumeById(id);
        const data = res?.data?.data;
        setResume(mapResumeFromBackend(data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!resume) return <div className="p-6 text-red-600">Resume not found.</div>;

  return (
    <div className="p-6">
      <JsonToPdfResumeSingleCol_WithFonts_UI initialData={resume} />
    </div>
  );
}

// ✅ Same mapping function as before
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
  const links = [];
  if (personal.website) links.push(personal.website);
  if (personal.linkedin) links.push(personal.linkedin);
  if (personal.github) links.push(personal.github);

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
    links,
  };
}
