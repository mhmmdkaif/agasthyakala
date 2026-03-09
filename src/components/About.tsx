"use client";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 100, suffix: "+", label: "Artworks" },
  { target: 50, suffix: "+", label: "Clients" },
  { target: 5, suffix: "★", label: "Rated" },
];

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    if (start) animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, animate]);

  return value;
}

function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string; }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const count = useCountUp(target, inView);
  return (
    <div ref={ref} className="text-center relative">
      <span className="font-display font-black block mb-1" style={{ fontSize: "clamp(22px,3vw,34px)", color: "var(--gold)" }}>
        {count}{suffix}
      </span>
      <span className="font-display text-[8px] tracking-[0.3em] uppercase" style={{ color: "var(--black-light)" }}>{label}</span>
    </div>
  );
}

function StatCounters() {
  return (
    <div className="grid grid-cols-3 mt-8 pt-6" style={{ borderTop: "1px solid rgba(201,150,58,0.18)" }}>
      {stats.map((s, i) => (
        <div key={i} className="relative">
          {i > 0 && <span className="absolute left-0 top-[12%] h-[76%] w-px" style={{ background: "rgba(201,150,58,0.18)" }} />}
          <StatItem target={s.target} suffix={s.suffix} label={s.label} />
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: l, inView: lv } = useInView({ threshold: 0.12, triggerOnce: true });
  const { ref: r, inView: rv } = useInView({ threshold: 0.12, triggerOnce: true });

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(".about-title", { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
    });
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-16 px-[6vw] bg-section overflow-hidden">
      {/* Alternating artwork background */}
      <div className="bg-img pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/artworks/mythological-canvas-painting-india.jpg" alt="" fill className="object-cover" style={{ filter: "blur(3px) brightness(0.12) saturate(0.3)", transform: "scale(1.05)" }} sizes="100vw" />
        </div>
      </div>
      <div className="bg-overlay" style={{ background: "rgba(255,255,255,0.94)" }} />

      <div className="bg-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1200px] mx-auto">
        {/* Images */}
        <motion.div ref={l} initial={{ opacity: 0, x: -36 }} animate={lv ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="relative max-w-sm mx-auto lg:mx-0 w-full">
          <div className="absolute -top-3 -left-3 right-8 bottom-8 border pointer-events-none" style={{ borderColor: "rgba(201,150,58,0.28)" }} />
          <Image src="/artworks/custom-portrait-painting-kerala-agasthyakala.jpg" alt="AgasthyaKala studio Kerala" width={440} height={560}
            className="w-full object-cover" style={{ aspectRatio: "4/5", boxShadow: "0 24px 60px rgba(10,10,10,0.12)" }} loading="lazy" />
          <Image src="/artworks/custom-portrait-from-photo-kerala.jpg" alt="Custom portrait from photo — AgasthyaKala Kerala" width={200} height={200}
            className="absolute object-cover hidden sm:block" loading="lazy"
            style={{ bottom: "-22px", right: "-22px", width: "46%", aspectRatio: "1", border: "5px solid #fff", boxShadow: "0 16px 40px rgba(10,10,10,0.14)" }} />
        </motion.div>

        {/* Text */}
        <motion.div ref={r} initial={{ opacity: 0, x: 36 }} animate={rv ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <span className="label">✦ Our Story</span>
          <h2 className="about-title font-display font-black uppercase leading-none mb-0"
            style={{ fontSize: "clamp(32px,4.5vw,56px)", letterSpacing: "-0.01em", color: "var(--black)", lineHeight: 0.9 }}>
            Where Kerala&apos;s<br /><span style={{ color: "var(--gold)" }}>Spirit</span><br />Meets Canvas
          </h2>
          <div className="gold-rule my-5" style={{ width: "44px" }} />
          <p className="font-serif font-light leading-loose mb-3.5" style={{ fontSize: "clamp(14px,1.4vw,17px)", color: "var(--black-mid)" }}>
            AgasthyaKala was born from a deep love for art and the rich cultural heritage of Kerala. Nestled in Payyannur, our studio breathes life into imagination — turning your ideas and memories into handcrafted masterpieces.
          </p>
          <p className="font-serif font-light leading-loose" style={{ fontSize: "clamp(14px,1.4vw,17px)", color: "var(--black-mid)" }}>
            Every artwork is crafted with patience, passion and precision. We do not mass-produce — every piece is{" "}
            <em className="not-italic font-semibold" style={{ color: "var(--gold)" }}>uniquely yours.</em>
          </p>
          <StatCounters />
        </motion.div>
      </div>
    </section>
  );
}
