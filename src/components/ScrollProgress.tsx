"use client";
import { useEffect, useState } from "react";
export default function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setW((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 h-[2px] z-[9999] pointer-events-none transition-all duration-75"
      style={{ width:`${w}%`, background:"linear-gradient(90deg, var(--gold), var(--gold-bright))" }} />
  );
}
