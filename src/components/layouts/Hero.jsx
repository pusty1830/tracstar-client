import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaMagic, FaStar, FaArrowRight, FaBolt, FaCheckCircle } from "react-icons/fa"
import Button from "../ui/Button"

/**
 * Trendy, animated Hero section with React Icons
 */
export default function Hero({ onCreate, onImprove }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
  }

  const float = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background: gradient + dot grid + glow blobs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(1200px 600px at 20% -10%, rgba(56,189,248,0.25), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(192,132,252,0.22), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 [mask-image:radial-gradient(closest-side,white,transparent)]"
          style={{
            backgroundSize: "24px 24px",
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
          }}
        />
        <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid items-center gap-12 md:grid-cols-2"
      >
        {/* Left */}
        <div className="relative">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-white/70 px-3 py-1.5 text-xs font-medium text-cyan-700 backdrop-blur">
            <FaBolt className="h-4 w-4" />
            <span>New: AI Resume Assistant v3</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-4 text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
          >
            Build a <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 bg-clip-text text-transparent">job‑winning</span> resume in minutes.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-base text-slate-600 md:text-lg"
          >
            Craft from scratch or upgrade what you have. Smart sections, ATS‑friendly formatting, and tone suggestions that highlight your impact—without the headache.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                onClick={onCreate}
                className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 px-5 py-3 text-base font-semibold text-slate-900 shadow-[0_8px_30px_rgba(255,200,0,0.35)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
              >
                Create new resume
                <FaArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                onClick={onImprove}
                variant="outline"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white/80 px-5 py-3 text-base font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                <FaMagic className="mr-2 h-5 w-5" /> Improve my resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
            <div className="inline-flex items-center gap-2">
              <FaStar className="h-4 w-4 text-yellow-400" />
              4.9/5 from 12k+ users
            </div>
            <div className="inline-flex items-center gap-2">
              <FaCheckCircle className="h-4 w-4 text-emerald-500" />
              ATS‑friendly templates
            </div>
            <div className="inline-flex items-center gap-2">
              <FaBolt className="h-4 w-4 text-cyan-500" />
              One‑click export (PDF / DOCX)
            </div>
          </motion.div>

          <AnimatePresence>
            <motion.div variants={float} animate="animate" className="pointer-events-none absolute -left-6 top-1/3 hidden select-none md:block">
              <Badge>Action verbs auto‑suggested</Badge>
            </motion.div>
            <motion.div variants={float} animate="animate" className="pointer-events-none absolute -right-8 top-1/2 hidden select-none md:block">
              <Badge>Quantify impact with AI</Badge>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right */}
        <div className="relative">
          <motion.div
            variants={fadeUp}
            className="relative mx-auto w-full max-w-md"
            whileHover={{ rotate: -0.5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-cyan-400/30 via-transparent to-violet-400/30 blur-xl" />
            <div className="relative rounded-3xl border border-white/60 bg-white/90 p-3 shadow-xl backdrop-blur">
              <img
                src="https://assets.zety.com/blobimages/zty/sem/images/anika-kumar-blue-resume.png?w=704"
                alt="Resume preview"
                className="h-auto w-full rounded-2xl object-cover"
                loading="lazy"
              />

              <motion.div variants={float} animate="animate" className="absolute -right-4 top-6 hidden w-36 rounded-2xl border border-slate-200 bg-white/90 p-3 text-xs shadow-lg backdrop-blur md:block">
                <div className="font-semibold text-slate-900">ATS Score</div>
                <div className="mt-1 text-emerald-600">92 / 100</div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[92%] rounded-full bg-emerald-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function Badge({ children }) {
  return (
    <div className="rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
      {children}
    </div>
  )
}
