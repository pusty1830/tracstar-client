import React from "react";
import { motion } from "framer-motion";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const steps = [
  {
    id: 1,
    img: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/step1.png&w=330&q=100",
    title: "Pick a resume template",
    desc: "Choose a sleek design and layout to get started.",
  },
  {
    id: 2,
    img: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/step2.png&w=330&q=100",
    title: "Fill in the blanks",
    desc: "Type a few words and let the AI assistant fill the rest.",
  },
  {
    id: 3,
    img: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/step3.png&w=330&q=100",
    title: "Customize your document",
    desc: "Fine‑tune sections, tone, and accents in a few clicks.",
  },
];

/**
 * Trendy, animated 3‑step section
 * - Staggered entrance + hover tilt
 * - Gradient accents + connecting progress line
 * - Responsive grid with CTA buttons
 */
export default function ResumeSteps() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const card = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 16 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16">
      {/* background blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        {/* heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Build a job‑ready resume in 3 steps
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">
            No design skills required. ATS‑friendly by default.
          </p>
        </div>

        {/* connecting progress line (desktop) */}
        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-1 w-full -translate-x-1/2 -translate-y-1/2 md:block">
            <div className="mx-auto h-full max-w-4xl rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 opacity-60" />
          </div>
        </div>

        {/* steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative z-[1] grid grid-cols-1 gap-10 md:grid-cols-3"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.id}
              variants={card}
              whileHover={{ y: -4, rotate: i === 1 ? 0.25 : 0 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:shadow-xl"
            >
              {/* gradient ring */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-400/20 via-transparent to-violet-400/20 opacity-0 transition group-hover:opacity-100" />

              {/* step badge */}
              <div className="relative z-[1] mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 text-white">
                  {s.id}
                </span>
                Step {s.id}
              </div>

              <div className="relative z-[1] flex flex-col items-center text-center">
                <img
                  src={s.img}
                  alt={s.title}
                  className="mb-4 h-40 w-auto select-none object-contain"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#create"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-300/40 transition hover:brightness-105"
          >
            <FaEdit className="h-5 w-5" /> Create new resume
          </a>
          <a
            href="#improve"
            className="inline-flex items-center gap-2 rounded-full border border-slate-900 px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            <FaWandMagicSparkles className="h-5 w-5" /> Improve my resume
          </a>
        </motion.div>

        <p className="mt-6 text-center text-xs text-slate-500">
          *Templates and suggestions are ATS‑friendly. Results vary by profile
          and market.
        </p>
      </div>
    </section>
  );
}
