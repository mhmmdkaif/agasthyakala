"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const items = ["Custom Portraits","Mythological Paintings","Cultural Illustrations","Pencil Drawings","Kerala Art Studio","Payyannur","Commission Your Art"];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.8, scrollTrigger: { trigger: ref.current, start: "top 95%" } });
  }, []);
  const doubled = [...items, ...items];
  return (
    <div ref={ref} className="overflow-hidden py-3 border-y" style={{ borderColor: "rgba(201,150,58,0.18)", background: "#FDFAF5" }} aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex-shrink-0 px-5" style={{ fontFamily: "var(--display)", fontSize: "8.5px", letterSpacing: "0.42em", textTransform: "uppercase", color: i % 8 === 7 ? "var(--gold)" : "var(--black-mid)" }}>
            {i % 8 === 7 ? "✦" : item}
          </span>
        ))}
      </div>
    </div>
  );
}
