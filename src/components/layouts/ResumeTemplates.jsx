import React, { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaSearchPlus, FaEdit, FaCheckCircle, FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa"

/**
 * Trendy Resume Templates gallery
 * - Animated cards with gradient borders and hover lift
 * - Inline color picker per template
 * - Quick preview modal with carousel
 * - "Use" selection state + saved (favorite) toggle
 */
export default function ResumeTemplates() {
  const [selected, setSelected] = useState(null)
  const [favorite, setFavorite] = useState({})
  const [previewIndex, setPreviewIndex] = useState(null) // index in filtered list
  const [accent, setAccent] = useState({}) // {id: hex}

  const templates = useMemo(
    () => [
      {
        id: 1,
        name: "Modern Minimal",
        img: "https://assets.zety.com/blobimages/zty/sem/images/anika-kumar-blue-resume.png?w=704",
        selectable: true,
        tags: ["ATS", "Minimal"],
      },
      {
        id: 2,
        name: "Classic Professional",
        img: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/template-01.png&w=640&q=90",
        selectable: true,
        tags: ["Classic", "Corporate"],
      },
      {
        id: 3,
        name: "Bold Accent",
        img: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/template-02.png&w=640&q=90",
        selectable: true,
        tags: ["Creative", "Color"],
      },
      {
        id: 4,
        name: "Elegant Serif",
        img: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/template-03.png&w=640&q=90",
        selectable: true,
        tags: ["Elegant", "Serif"],
      },
      {
        id: 5,
        name: "Tech Timeline",
        img: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/template-04.png&w=640&q=90",
        selectable: true,
        tags: ["Tech", "Timeline"],
      },
      {
        id: 6,
        name: "Hybrid Two-Column",
        img: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/template-05.png&w=640&q=90",
        selectable: true,
        tags: ["Hybrid", "Two-Column"],
      },
      {
        id: 7,
        name: "Clean Lines",
        img: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/template-06.png&w=640&q=90",
        selectable: true,
        tags: ["Clean", "Simple"],
      },
      {
        id: 8,
        name: "Compact Entry",
        img: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/template-07.png&w=640&q=90",
        selectable: true,
        tags: ["Compact", "Entry-level"],
      },
    ],
    []
  )

  const colors = ["#1e3a8a", "#b91c1c", "#16a34a", "#0ea5e9", "#f59e0b", "#6b7280"]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  }

  const card = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
  }

  function openPreview(idx) {
    setPreviewIndex(idx)
  }

  function closePreview() {
    setPreviewIndex(null)
  }

  function nextPreview(dir) {
    if (previewIndex === null) return
    const len = templates.length
    setPreviewIndex((prev) => (prev + (dir === "next" ? 1 : -1) + len) % len)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white py-14">
      {/* background accents */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Pick a resume template</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">ATS‑friendly, professionally designed, and customizable accents.</p>
        </motion.div>

        {/* Templates Grid */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template, idx) => {
            const isSelected = selected === template.id
            const accentColor = accent[template.id] || "#0ea5e9"
            const isFav = favorite[template.id]
            return (
              <motion.div key={template.id} variants={card} whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl">
                {/* Gradient ring */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-400/20 via-transparent to-violet-400/20 opacity-0 transition group-hover:opacity-100" />

                {/* Top bar */}
                <div className="relative z-[1] flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-semibold text-slate-600">{template.name}</span>
                  <button
                    aria-label={isFav ? "Remove from favorites" : "Save to favorites"}
                    onClick={() => setFavorite((f) => ({ ...f, [template.id]: !isFav }))}
                    className={`rounded-full px-2 py-1 text-xs font-semibold transition ${isFav ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
                  >
                    <FaHeart className={`inline-block align-[-2px] ${isFav ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
                  </button>
                </div>

                {/* Preview image */}
                <div className="relative z-[1]">
                  <img src={template.img} alt={`${template.name} preview`} className="h-72 w-full object-cover" loading="lazy" />

                  {/* Selected badge */}
                  {isSelected && (
                    <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-emerald-600 shadow">
                      <FaCheckCircle className="h-3.5 w-3.5" /> Selected
                    </div>
                  )}

                  {/* Zoom button */}
                  <button
                    onClick={() => openPreview(idx)}
                    className="absolute bottom-2 right-2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
                    aria-label="Preview template"
                  >
                    <FaSearchPlus className="h-4 w-4 text-slate-700" />
                  </button>
                </div>

                {/* Bottom controls */}
                <div className="relative z-[1] space-y-3 p-3">
                  {/* Color picker */}
                  {template.selectable && (
                    <div className="flex items-center gap-2">
                      {colors.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => setAccent((a) => ({ ...a, [template.id]: c }))}
                          className="h-5 w-5 rounded-full border-2 border-white ring-1 ring-slate-200 transition hover:scale-110"
                          style={{ backgroundColor: c }}
                          aria-label={`Set accent ${c}`}
                          title={c}
                        />
                      ))}
                      <span className="ml-2 text-[11px] text-slate-500">Accent</span>
                    </div>
                  )}

                  {/* Use button */}
                  {template.selectable && (
                    <button
                      onClick={() => setSelected(template.id)}
                      className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800"
                    >
                      Use this template
                    </button>
                  )}
                </div>

                {/* Accent visual bar */}
                <div className="relative z-[1] h-1.5 w-full" style={{ background: accentColor }} />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Button */}
        <div className="mt-12 flex justify-center">
          <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 px-6 py-3 font-medium text-slate-900 shadow-lg shadow-amber-300/40 transition hover:brightness-105">
            <FaEdit className="h-5 w-5" />
            View more templates
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h2 className="text-sm font-semibold text-slate-800">{templates[previewIndex].name}</h2>
                <button onClick={closePreview} className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200">Close</button>
              </div>
              <div className="relative grid grid-cols-1 gap-6 p-4 md:grid-cols-12">
                <div className="md:col-span-9">
                  <img
                    src={templates[previewIndex].img}
                    alt={`${templates[previewIndex].name} large preview`}
                    className="h-[70vh] w-full rounded-lg object-contain bg-slate-50"
                  />
                </div>
                <div className="md:col-span-3 space-y-3">
                  <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">
                    <p>Clean, ATS‑friendly layout with customizable accent color and one‑click export to PDF/DOCX.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelected(templates[previewIndex].id)
                      closePreview()
                    }}
                    className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Use this template
                  </button>
                  <div className="flex items-center justify-between">
                    <button onClick={() => nextPreview("prev")} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
                      <FaChevronLeft /> Prev
                    </button>
                    <button onClick={() => nextPreview("next")} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
                      Next <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
              {/* Accent bar for preview card */}
              <div className="h-1.5 w-full" style={{ background: accent[templates[previewIndex].id] || "#0ea5e9" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}