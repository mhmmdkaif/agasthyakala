"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

const links = NAV_LINKS;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [passedHero, setPassedHero] = useState(false);

  useEffect(() => {
    const check = () => setPassedHero(window.scrollY > window.innerHeight * 0.6);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const bg = open ? "rgba(255,255,255,0.97)" : passedHero ? "rgba(255,255,255,0.97)" : "transparent";
  const color = open ? "#1a1a1a" : passedHero ? "#1a1a1a" : "#ffffff";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: passedHero ? "14px 5vw" : "24px 5vw",
          backgroundColor: bg,
          borderBottom: passedHero ? "1px solid rgba(0,0,0,0.07)" : "none",
          backdropFilter: passedHero ? "blur(12px)" : "none",
          transition: "background-color 0.4s ease, padding 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* Logo — bigger */}
        <a href="#hero" onClick={e => { e.preventDefault(); go("#hero"); }}>
          <Image
            src="/logo/logo.png"
            alt="AgasthyaKala"
            width={260} height={80}
            style={{ height: "clamp(44px, 5vw, 64px)", width: "auto" }}
            priority
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex" style={{ alignItems: "center", gap: 40, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(l => (
            <li key={l.label}>
              <button
                onClick={() => go(l.href)}
                className="nav-link"
                style={{ color }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile — text toggle instead of hamburger lines */}
        <button
          onClick={() => setOpen(v => !v)}
          className="lg:hidden menu-toggle"
          style={{ color }}
          aria-label="Menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 12,
              background: "#faf9f7",
            }}
          >
            {/* Decorative line */}
            <div style={{
              position: "absolute", top: "50%", left: "5vw", right: "5vw",
              height: "1px", background: "rgba(0,0,0,0.06)", transform: "translateY(-50%)",
              pointerEvents: "none",
            }} />

            {links.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                onClick={() => go(l.href)}
                className="mobile-link"
              >
                {l.label}
              </motion.button>
            ))}

            {/* Close hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                position: "absolute", bottom: 32,
                fontFamily: "var(--font-cinzel), 'Cinzel', serif",
                fontSize: "9px", letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#aaa",
              }}
            >
              Tap anywhere to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close mobile menu on backdrop tap */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 39 }}
        />
      )}
    </>
  );
}