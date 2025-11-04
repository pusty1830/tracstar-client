import React, { useEffect, useState } from "react";

const Topbar = () => {
  const [display, setDisplay] = useState("🇮🇳 INDIA (ENGLISH)");
  const [menuOpen, setMenuOpen] = useState(false);

  const ccToFlag = (cc) =>
    cc && cc.length === 2
      ? String.fromCodePoint(
          ...[...cc.toUpperCase()].map((c) => 0x1f1e6 + (c.charCodeAt(0) - 65))
        )
      : "🌐";

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const langTag = navigator.language || "en";
      const hasLocale =
        typeof Intl !== "undefined" && typeof Intl.Locale === "function";
      const hasDisplayNames =
        typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function";

      const locale = hasLocale ? new Intl.Locale(langTag) : null;
      const langCode = locale?.language || "en";
      const langName = hasDisplayNames
        ? new Intl.DisplayNames([langTag], { type: "language" }).of(langCode)
        : langCode;

      let region = locale?.region || "";

      // Fallback: timezone-based country guess
      if (!region) {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        const tzToRegion = {
          "Asia/Kolkata": "IN",
        };
        region = tzToRegion[tz] || "";
      }

      // ✅ If user is from India → show language
      if (region === "IN") {
        const countryName = new Intl.DisplayNames([langTag], {
          type: "region",
        }).of(region);
        const flag = ccToFlag(region);
        setDisplay(
          `${flag} ${countryName.toUpperCase()} (${(
            langName || "English"
          ).toUpperCase()})`
        );
      } else {
        // ✅ If NOT from India → still show INDIA (ENGLISH)
        setDisplay(`${ccToFlag("IN")} INDIA (ENGLISH)`);
      }
    } catch {
      setDisplay(`${ccToFlag("IN")} INDIA (ENGLISH)`);
    }
  }, []);

  return (
    <div className="w-full bg-blue-500 text-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-3 md:px-5 py-2">
        {/* Left links: hidden on very small screens, visible from sm and up */}
        <div className="hidden sm:flex items-center gap-4 text-xs md:text-sm font-semibold">
          <a
            href="/coming-soon"
            className="hover:underline underline-offset-4 whitespace-nowrap"
          >
            FOR JOB SEEKERS
          </a>
          <a
            href="/coming-soon"
            className="hover:underline underline-offset-4 whitespace-nowrap"
          >
            FOR EMPLOYERS
          </a>
        </div>

        {/* Mobile menu button (visible on small screens) */}
        <div className="flex items-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((s) => !s)}
            aria-expanded={menuOpen}
            aria-controls="topbar-menu"
            className="inline-flex items-center justify-center rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white/80"
            title="Open menu"
          >
            <span className="sr-only">Open topbar menu</span>
            {/* simple icon: three dots / menu */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
            </svg>
          </button>
        </div>

        {/* Center / Right: language display — truncated on small screens */}
        <div className="flex-1 flex justify-end">
          <div className="text-xs md:text-sm font-semibold max-w-[220px] md:max-w-none truncate text-right">
            {display}
          </div>
        </div>
      </div>

      {/* Mobile collapsible menu (only on small screens) */}
      <div
        id="topbar-menu"
        className={`sm:hidden border-t border-white/10 overflow-hidden transition-all ${
          menuOpen ? "max-h-40" : "max-h-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="px-3 py-2 flex flex-col gap-2 text-sm font-semibold bg-blue-500">
          <a
            href="/coming-soon"
            className="hover:underline underline-offset-4 whitespace-nowrap"
            onClick={() => setMenuOpen(false)}
          >
            FOR JOB SEEKERS
          </a>
          <a
            href="/coming-soon"
            className="hover:underline underline-offset-4 whitespace-nowrap"
            onClick={() => setMenuOpen(false)}
          >
            FOR EMPLOYERS
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
