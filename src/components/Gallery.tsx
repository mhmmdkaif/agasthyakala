"use client";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_ITEMS } from "@/lib/constants";
gsap.registerPlugin(ScrollTrigger);

const MOSAIC: { id: number; col: string; row: string }[] = [
  { id: 1, col: "1 / 3", row: "1 / 3" },
  { id: 2, col: "3 / 5", row: "1 / 2" },
  { id: 3, col: "5 / 7", row: "1 / 2" },
  { id: 4, col: "7 / 9", row: "1 / 2" },
  { id: 5, col: "9 / 11", row: "1 / 2" },
  { id: 6, col: "11/ 13", row: "1 / 3" },
  { id: 7, col: "3 / 5", row: "2 / 3" },
  { id: 8, col: "5 / 7", row: "2 / 3" },
  { id: 9, col: "7 / 9", row: "2 / 3" },
  { id: 10, col: "9 / 11", row: "2 / 3" },
  { id: 11, col: "4 / 10", row: "3 / 4" },
];

/* ─── Lightbox ─── */
function CardStack({ startIndex, onClose }: { startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);
  const go = useCallback((d: number) => setCurrent(p => (p + d + GALLERY_ITEMS.length) % GALLERY_ITEMS.length), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, go]);

  const visible = [
    GALLERY_ITEMS[(current + 2) % GALLERY_ITEMS.length],
    GALLERY_ITEMS[(current + 1) % GALLERY_ITEMS.length],
    GALLERY_ITEMS[current],
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[900] flex items-center justify-center"
      style={{ background: "rgba(8,8,8,0.96)", backdropFilter: "blur(14px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 24, fontFamily: "var(--display)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer" }}>✕ Close</button>
      <div style={{ position: "absolute", top: 22, left: 24, fontFamily: "var(--display)", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)" }}>
        {String(current + 1).padStart(2, "0")} / {String(GALLERY_ITEMS.length).padStart(2, "0")}
      </div>
      <div className="relative flex items-center justify-center" style={{ width: "min(80vw,520px)", height: "min(80vh,620px)" }}>
        {visible.map((art, i) => {
          const isTop = i === 2;
          const offset = (2 - i) * 10, rot = (2 - i) * 2.5;
          return (
            <motion.div key={art.id}
              style={{
                position: "absolute", width: "100%", height: "100%", zIndex: i, rotate: rot, x: offset, y: -offset * 0.5,
                boxShadow: isTop ? "0 40px 80px rgba(0,0,0,0.6)" : "0 20px 40px rgba(0,0,0,0.3)",
                border: isTop ? "1px solid rgba(201,150,58,0.3)" : "1px solid rgba(255,255,255,0.06)",
                cursor: isTop ? "grab" : "default"
              }}
              drag={isTop ? "x" : false} dragConstraints={{ left: -50, right: 50 }}
              onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
              whileDrag={{ cursor: "grabbing", scale: 1.02 }}
              animate={{ rotate: rot, x: offset, y: -offset * 0.5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <Image src={art.src} alt={art.alt} fill className="object-cover" sizes="520px" />
            </motion.div>
          );
        })}
      </div>
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 24 }}>
        <button onClick={() => go(-1)} style={{ fontFamily: "var(--display)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>← Prev</button>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
        <span style={{ fontFamily: "var(--serif)", fontSize: "12px", fontStyle: "italic", color: "rgba(255,255,255,0.2)" }}>drag or use arrows</span>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
        <button onClick={() => go(1)} style={{ fontFamily: "var(--display)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>Next →</button>
      </div>
    </motion.div>
  );
}

/* ─── Gallery ─── */
export default function Gallery() {
  const [lb, setLb] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const open = (i: number) => { setLb(i); document.body.style.overflow = "hidden"; };
  const close = () => { setLb(null); document.body.style.overflow = ""; };

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(".gallery-title", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: headerRef.current, start: "top 85%" }
    });
    gsap.fromTo(".gallery-meta", { y: 16, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
      scrollTrigger: { trigger: headerRef.current, start: "top 85%" }
    });
  }, []);

  return (
    <section
      id="gallery"
      style={{
        background: "var(--off)",
        /* even internal padding — top slightly more, bottom same */
        padding: "clamp(28px, 3.5vh, 48px) clamp(12px, 4vw, 48px) clamp(28px, 3.5vh, 48px)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >

      {/* ── Header ── */}
      <div ref={headerRef} style={{ marginBottom: "clamp(12px, 1.8vh, 24px)" }}>

        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <div style={{ width: 24, height: "0.5px", background: "rgba(201,150,58,0.55)" }} />
          <span style={{ fontFamily: "var(--display)", fontSize: "8px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,150,58,0.5)" }}>
            Portfolio
          </span>
        </div>

        {/* title */}
        <h2
          className="gallery-title font-display font-black uppercase"
          style={{
            fontSize: "clamp(38px, 6vw, 82px)",
            letterSpacing: "-0.025em",
            lineHeight: 0.9,
            color: "var(--black)",
            margin: 0,
          }}
        >
          Our{" "}
          <span style={{ WebkitTextStroke: "2px var(--gold)", WebkitTextFillColor: "transparent" }}>
            Artwork
          </span>
        </h2>

        {/* tagline — directly under the heading */}
        <div className="gallery-meta" style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(12px, 1.15vw, 15px)",
              color: "var(--black-mid)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Handcrafted custom paintings &amp; portraits — every piece a testament to Kerala&apos;s artistic soul.
          </p>

          {/* divider dot */}
          <span style={{ color: "rgba(201,150,58,0.3)", fontSize: 10 }}>✦</span>

          {/* piece count */}
          <span style={{ fontFamily: "var(--display)", fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,150,58,0.45)" }}>
            {GALLERY_ITEMS.length} works
          </span>
        </div>
      </div>

      {/* ── Mosaic ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "1fr 1fr auto",
          gap: "3px",
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
          /* let the grid fill remaining height naturally */
          minHeight: 0,
        }}
      >
        {MOSAIC.map((layout, i) => {
          const art = GALLERY_ITEMS[i];
          return (
            <div
              key={art.id}
              onClick={() => open(i)}
              className="group"
              style={{
                gridColumn: layout.col,
                gridRow: layout.row,
                position: "relative",
                overflow: "hidden",
                cursor: "crosshair",
                background: "var(--black)",
              }}
            >
              <Image
                src={art.src}
                alt={art.alt}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                sizes="(max-width:768px) 50vw, 20vw"
                loading={i < 6 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                style={{ boxShadow: "inset 0 0 0 1.5px rgba(201,150,58,0.6)" }} />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex items-end justify-end p-3"
                style={{ background: "linear-gradient(135deg, transparent 50%, rgba(8,8,8,0.55) 100%)" }}>
                <span style={{ fontFamily: "var(--display)", fontSize: "8px", letterSpacing: "0.2em", color: "rgba(201,150,58,0.7)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {lb !== null && <CardStack startIndex={lb} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}