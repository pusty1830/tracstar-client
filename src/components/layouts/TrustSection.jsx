import React from "react"
import { motion } from "framer-motion"
import { FiArrowUpRight } from "react-icons/fi"
import { FaShieldAlt, FaAward } from "react-icons/fa"

/**
 * Enhanced, animated Trust section
 * - Tailwind + Framer Motion
 * - Glassy stat card, subtle gradients, and interactive logo wall
 * - Fully responsive, accessible alts, lazy-loaded images
 */
export default function TrustSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 14 } },
  }

  const logos = [
    {
      alt: "Amazon",
      src: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/amazon_logo.svg&w=87&q=100",
      width: 96,
    },
    {
      alt: "Boeing",
      src: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/boeing_logo.svg&w=147&q=100",
      width: 128,
    },
    {
      alt: "Google",
      src: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/google_logo.svg&w=83&q=100",
      width: 96,
    },
    {
      alt: "Starbucks",
      src: "https://assets.zety.com/lp/_next/image?url=/blobimages/zty/sem/images/starbucks_logo.svg&w=35&q=100",
      width: 72,
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-14">
      {/* background accents */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-8 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-12"
      >
        {/* Left: Stats card */}
        <motion.div variants={fadeUp} className="relative md:col-span-5">
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur">
            {/* glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/5" />
            <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-cyan-400/30 via-transparent to-violet-400/30 blur-2xl" />

            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-700">
              <FaShieldAlt className="h-4 w-4" />
              Trusted results
            </div>

            <div className="mt-4 space-y-4">
              <Stat
                value={<><span className="text-slate-900">30%</span> higher</>}
                text="chance of getting an interview*"
              />
              <Stat
                value={<><span className="text-slate-900">42%</span> more</>}
                text="responses from recruiters*"
              />
            </div>

            <div className="mt-5 flex items-center gap-3 text-xs text-slate-500">
              <FaAward className="h-4 w-4 text-amber-500" />
              <span>ATS‑friendly formatting • Impact‑focused phrasing • One‑click export</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Logo wall */}
        <motion.div variants={fadeUp} className="md:col-span-7">
          <p className="mb-4 text-center text-sm font-semibold text-slate-700 md:text-left">
            Our users have been hired at:
          </p>

          <motion.ul
            variants={container}
            className="grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 md:grid-cols-4"
          >
            {logos.map((l, i) => (
              <motion.li key={l.alt} variants={fadeUp}>
                <img
                  src={l.src}
                  alt={l.alt}
                  loading="lazy"
                  width={l.width}
                  className="h-8 w-auto select-none grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
                />
              </motion.li>
            ))}
          </motion.ul>

          {/* footnote */}
          <p className="mt-5 text-center text-xs text-slate-500 md:text-left">
            *Based on internal user surveys and benchmark tests; results vary by profile and market.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Stat({ value, text }) {
  return (
    <div className="group inline-flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-sm transition hover:shadow-md">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
        <FiArrowUpRight className="h-4 w-4" />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-bold text-teal-700">{value}</div>
        <div className="text-sm text-slate-600">{text}</div>
      </div>
    </div>
  )
}
