import React, { useState, useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// keep built-in Roboto available as fallback
pdfMake.vfs = pdfFonts.vfs;

/* -------------------------
   (same sample data omitted for brevity — keep your sampleData object)
   ------------------------- */

const sampleData = {
  name: "AMITAV PUSTY",
  title: "",
  email: "amitav.prusty089@gmail.com",
  phone: "+91 63713 72865",
  location: "Palasuni, Bhubaneswar",
  website: "https://amitavpusty.site",
  linkedin: "https://linkedin.com/in/amitavpusty",
  github: "https://github.com/pusty1830",
  summary:
    "Full-stack developer with 1+ years of experience delivering scalable web applications and cloud deployments using React.js, Node.js, and AWS. Proficient in REST API development, real-time communication, databases, and advanced problem-solving with a focus on clean, maintainable, and testable code.",
  skills: [
    "JavaScript (ES6+)",
    "TypeScript",
    "Java",
    "Python",
    "SQL",
    "React.js",
    "Node.js",
    "Express",
    "MySQL",
    "MongoDB",
    "AWS",
  ],
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      school: "GITA Autonomous College, Bhubaneswar",
      period: "Sept 2022 – Apr 2026",
      extra: "CGPA: 9.11/10",
    },
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "Livoso Technologies",
      period: "Apr 2025 – Oct 2025",
      bullets: [
        "Developed and deployed a complete, scalable Gym Management System (gym.livosotech.com) encompassing membership, scheduling, and payments.",
        "Engineered responsive frontend with React.js, backend microservices using Node.js/Express, and managed data persistence in MySQL.",
      ],
    },
    {
      role: "Intern & Software Engineer",
      company: "Sequspace Private Limited",
      period: "May 2024 – Mar 2025",
      bullets: [
        "Contributed to the My Daily Lives platform (mydailylives.com) including meeting module and collaboration features.",
        "Built backend APIs with Node.js/Express, frontend in React.js, and realtime features with socket.io.",
      ],
    },
  ],
  projects: [
    {
      name: "Huts4U – Hotel Booking System",
      url: "https://huts4u.in",
      desc: "Designed and deployed a scalable hotel booking system supporting room search, booking flow and secure payment workflows. RESTful APIs in Node.js, MySQL, React frontend.",
    },
    {
      name: "Doctor Portfolio with EHR System",
      url: "https://drpuspaksamal.com",
      desc: "Doctor portfolio integrated with EHR, patient records, scheduling and authentication.",
    },
  ],
  links: ["https://amitavpusty.site", "https://github.com/pusty1830"],
};

/* -------------------------
  Utility: convert ArrayBuffer -> base64
  ------------------------- */
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary);
}

/* -------------------------
  Inject font from URL into pdfMake.vfs
  ------------------------- */
async function injectFontFromUrl(url, fileName) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch font: ${url}`);
  const ab = await res.arrayBuffer();
  const b64 = arrayBufferToBase64(ab);
  pdfMake.vfs[fileName] = b64;
}

/* -------------------------
   Helper & core pdf doc builder
   ------------------------- */
function hr(width = 520, color = "#e5e7eb") {
  return {
    canvas: [{ type: "line", x1: 0, y1: 0, x2: width, y2: 0, lineWidth: 1, color }],
    margin: [0, 8, 0, 8],
  };
}

function buildDocDefinition(data, options = {}) {
  const fontName = options.fontName || "Roboto";

  const contactItems = [
    data.location,
    data.email,
    data.phone,
    data.website?.replace(/^https?:\/\//, ""),
    data.linkedin?.replace(/^https?:\/\//, ""),
    data.github?.replace(/^https?:\/\//, ""),
  ].filter(Boolean);

  const experienceBlocks = (data.experience || []).flatMap((exp) => [
    {
      columns: [
        {
          width: "*",
          text: [
            { text: exp.role, bold: true },
            { text: ` — ${exp.company}` },
          ],
        },
        { width: "auto", text: exp.period, style: "muted", alignment: "right" },
      ],
      margin: [0, 6, 0, 0],
    },
    { ul: exp.bullets || [], margin: [12, 4, 0, 6], bulletMargin: 6 },
  ]);

  const projectBlocks = (data.projects || []).flatMap((p) => [
    { text: p.name + (p.url ? " ↗" : ""), bold: true, margin: [0, 6, 0, 2] },
    { text: p.desc, margin: [12, 0, 0, 4] },
  ]);

  const skillsLine = { text: (data.skills || []).join(", "), margin: [0, 4, 0, 8], style: "skills", alignment: "left" };

  const educationBlocks = (data.education || []).flatMap((ed) => [
    { text: ed.degree, bold: true, margin: [0, 6, 0, 2] },
    { text: `${ed.school} — ${ed.period}`, style: "muted", margin: [0, 0, 0, 2] },
    ed.extra ? { text: ed.extra, margin: [0, 0, 0, 6] } : {},
  ]);

  const linksBlocks = (data.links || []).map((l) => ({ text: l.replace(/^https?:\/\//, ""), style: "link", margin: [0, 2, 0, 2] }));

  const content = [
    { text: data.name, style: "name", alignment: "center" },
    { text: data.title || "", style: "title", alignment: "center", margin: [0, 2, 0, 6] },
    {
      text: contactItems.map((c, i) => (i === contactItems.length - 1 ? c : c + "  |  ")).join(""),
      style: "contact",
      alignment: "center",
      margin: [0, 8, 0, 4],
    },
    hr(520),
    { text: "Summary", style: "sectionHeader" },
    { text: data.summary, style: "body", margin: [0, 4, 0, 8] },
    { text: "Skills", style: "sectionHeader" },
    skillsLine,
    { text: "Education", style: "sectionHeader" },
    ...educationBlocks,
    { text: "Experience", style: "sectionHeader" },
    ...experienceBlocks,
    { text: "Projects", style: "sectionHeader" },
    ...projectBlocks,
    { text: "Links", style: "sectionHeader" },
    ...linksBlocks,
  ];

  return {
    pageSize: "A4",
    pageMargins: [36, 36, 36, 36],
    content,
    styles: {
      name: { fontSize: 25, bold: true, margin: [0, 6, 0, 6], color: "#111827" },
      title: { fontSize: 10, color: "#374151" },
      contact: { fontSize: 9, color: "#374151" },
      sectionHeader: { fontSize: 10, bold: true, color: "#111827", margin: [0, 4, 0, 0], alignment: "left" },
      body: { fontSize: 10, color: "#111827", lineHeight: 1.2, alignment: "left" },
      skills: { fontSize: 10, color: "#111827" },
      muted: { fontSize: 9, color: "#6b7280" },
      link: { fontSize: 9, color: "#1d4ed8" },
    },
    defaultStyle: { fontSize: 10, font: fontName },
  };
}

/* -------------------------
   Responsive component
   ------------------------- */
export default function JsonToPdfResumeSingleCol_WithFonts_UI({ initialData = sampleData }) {
  const [data, setData] = useState(initialData);
  const [jsonText, setJsonText] = useState(JSON.stringify(initialData, null, 2));
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState(null);
  const [jsonValid, setJsonValid] = useState(true);
  const [jsonErrorMsg, setJsonErrorMsg] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(780);

  useEffect(() => {
    function onResize() {
      const w = window.innerWidth;
      setIsMobile(w <= 900);
      // adjust iframe height responsively
      const base = Math.max(420, Math.floor(window.innerHeight * 0.7));
      setIframeHeight(base);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Load fonts from public/fonts (Charter)
  useEffect(() => {
    let mounted = true;
    async function loadFonts() {
      try {
        await injectFontFromUrl("/src/fonts/Charter Regular.ttf", "Charter-Regular.ttf");
        try {
          await injectFontFromUrl("/src/fonts/Charter-Bold.ttf", "Charter-Bold.ttf");
        } catch {
          pdfMake.vfs["Charter-Bold.ttf"] = pdfMake.vfs["Charter-Regular.ttf"];
        }

        pdfMake.fonts = {
          Roboto: {
            normal: "Roboto-Regular.ttf",
            bold: "Roboto-Medium.ttf",
            italics: "Roboto-Italic.ttf",
            bolditalics: "Roboto-MediumItalic.ttf",
          },
          Charter: {
            normal: "Charter-Regular.ttf",
            bold: "Charter-Bold.ttf",
            italics: "Charter-Regular.ttf",
            bolditalics: "Charter-Bold.ttf",
          },
        };

        if (!mounted) return;
        setFontsLoaded(true);
      } catch (err) {
        console.error("Font load error:", err);
        if (!mounted) return;
        setFontError(err.message || String(err));
        setFontsLoaded(true); // allow fallback preview
      }
    }
    loadFonts();
    return () => {
      mounted = false;
    };
  }, []);

  // Update preview when data or fontsLoaded change
  useEffect(() => {
    if (!fontsLoaded) return;
    try {
      const dd = buildDocDefinition(data, { fontName: fontError ? "Roboto" : "Charter" });
      pdfMake.createPdf(dd).getDataUrl((url) => setPreviewUrl(url));
    } catch (err) {
      console.error("pdf error:", err);
      setPreviewUrl(null);
    }
  }, [data, fontsLoaded, fontError]);

  // Handlers
  const handleDownload = () => {
    const dd = buildDocDefinition(data, { fontName: fontError ? "Roboto" : "Charter" });
    pdfMake.createPdf(dd).download(`${(data.name || "resume").replace(/\s+/g, "_")}.pdf`);
  };
  const handleOpen = () => {
    const dd = buildDocDefinition(data, { fontName: fontError ? "Roboto" : "Charter" });
    pdfMake.createPdf(dd).open();
  };

  const handleJsonChange = (e) => {
    const txt = e.target.value;
    setJsonText(txt);
    try {
      const parsed = JSON.parse(txt);
      setJsonValid(true);
      setJsonErrorMsg("");
      setData(parsed);
    } catch (err) {
      setJsonValid(false);
      setJsonErrorMsg(err.message);
    }
  };

  const handleLoadSample = () => {
    const s = JSON.stringify(sampleData, null, 2);
    setJsonText(s);
    setData(sampleData);
    setJsonValid(true);
    setJsonErrorMsg("");
  };

  const handleFileUpload = (evt) => {
    const file = evt.target.files && evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const txt = String(reader.result);
      setJsonText(txt);
      try {
        const parsed = JSON.parse(txt);
        setJsonValid(true);
        setJsonErrorMsg("");
        setData(parsed);
      } catch (err) {
        setJsonValid(false);
        setJsonErrorMsg(err.message);
      }
    };
    reader.readAsText(file);
    evt.target.value = "";
  };

  const handleValidate = () => {
    try {
      JSON.parse(jsonText);
      setJsonValid(true);
      setJsonErrorMsg("");
      alert("JSON is valid ✓");
    } catch (err) {
      setJsonValid(false);
      setJsonErrorMsg(err.message);
      alert("Invalid JSON: " + err.message);
    }
  };

  // responsive inline styles
  const styles = {
    page: { padding: 18, fontFamily: "Arial, sans-serif" },
    layout: (mobile) => ({ display: "flex", gap: 16, flexDirection: mobile ? "column" : "row" }),
    leftCard: (mobile) => ({
      background: "#fff",
      border: "1px solid #e6eef6",
      borderRadius: 10,
      padding: 16,
      boxShadow: "0 6px 18px rgba(12, 22, 36, 0.04)",
      width: mobile ? "100%" : "auto",
    }),
    headerRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" },
    fontBadge: (ok) => ({
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      color: ok ? "#064e3b" : "#46302b",
      background: ok ? "#ecfdf5" : "#fff7ed",
      border: `1px solid ${ok ? "#bbf7d0" : "#fcd6b6"}`,
    }),
    textarea: (mobile) => ({ width: "100%", height: mobile ? 320 : 520, fontFamily: "monospace", fontSize: 13, padding: 12, borderRadius: 8, border: "1px solid #e6eef6" }),
    controlsRow: (mobile) => ({ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", alignItems: "center", flexDirection: mobile ? "column" : "row" }),
    btn: (bg = "#041d29") => ({
      background: bg,
      color: "white",
      padding: "10px 14px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
    }),
    btnGhost: {
      background: "transparent",
      color: "#111827",
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #e6eef6",
      cursor: "pointer",
      fontWeight: 600,
    },
    statusText: { fontSize: 13, color: jsonValid ? "#064e3b" : "crimson", marginTop: 8 },
  };

  return (
    <div style={styles.page}>
      <h2 style={{ marginTop: 0 }}>JSON → PDF Resume (LaTeX-like — Charter font)</h2>

      {!fontsLoaded && <div style={{ color: "#6b7280" }}>Loading fonts…</div>}
      {fontError && (
        <div style={{ color: "crimson", marginBottom: 8 }}>
          Warning: failed to load Charter font — using Roboto fallback. ({fontError})
        </div>
      )}

      <div style={styles.layout(isMobile)}>
        {/* LEFT: Editor / Controls */}
        <div style={{ flex: isMobile ? "none" : 1 }}>
          <div style={styles.leftCard(isMobile)}>
            <div style={styles.headerRow}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Editable JSON</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                  Paste JSON, upload a JSON file, or click Load sample to try the resume.
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={styles.fontBadge(!!fontsLoaded)}>{fontsLoaded ? "Charter loaded" : "Loading fonts..."}</div>
                <label style={{ display: "inline-block", cursor: "pointer" }}>
                  <input type="file" accept=".json,application/json" onChange={handleFileUpload} style={{ display: "none" }} />
                  <span style={{ ...styles.btnGhost, padding: "6px 10px", fontSize: 13 }}>Upload JSON</span>
                </label>
              </div>
            </div>

            <textarea value={jsonText} onChange={handleJsonChange} style={styles.textarea(isMobile)} />

            <div style={styles.controlsRow(isMobile)}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={handleLoadSample} style={styles.btn("#0b66ff")}>Load sample</button>
                <button onClick={handleValidate} style={styles.btnGhost}>Validate JSON</button>
              </div>

              <div style={{ display: "flex", gap: 8, marginLeft: isMobile ? 0 : "auto", width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "space-between" : "flex-end" }}>
                <button onClick={handleDownload} style={styles.btn("#047857")} disabled={!fontsLoaded || !jsonValid}>
                  📄 Download PDF
                </button>

                <button onClick={handleOpen} style={styles.btn("#0f172a")} disabled={!fontsLoaded || !jsonValid}>
                  🔍 Open PDF
                </button>
              </div>
            </div>

            <div style={styles.statusText}>{jsonValid ? "Parsed successfully." : `Error: ${jsonErrorMsg}`}</div>

            <div style={{ marginTop: 12, fontSize: 12, color: "#6b7280" }}>
              Tip: Enable "Background graphics" when printing to preserve header lines if you export via browser print.
            </div>
          </div>
        </div>

        {/* RIGHT: Preview */}
        <div style={{ width: isMobile ? "100%" : 520, marginTop: isMobile ? 12 : 0 }}>
          <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ margin: 0 }}>Preview</h4>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{fontsLoaded ? (fontError ? "Using fallback font" : "Using Charter") : "Waiting fonts..."}</div>
          </div>

          <div style={{ border: "1px solid #e6eef6", borderRadius: 8, overflow: "hidden" }}>
            {previewUrl ? (
              <iframe title="pdf-preview" src={previewUrl} style={{ width: "100%", height: iframeHeight, border: 0 }} />
            ) : (
              <div style={{ padding: 20, color: "#6b7280" }}>Generating preview…</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
