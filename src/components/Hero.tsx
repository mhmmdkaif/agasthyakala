"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { WA_URL } from "@/lib/constants";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    type P = { x: number; y: number; size: number; speed: number; opacity: number; drift: number };
    const particles: P[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      size: Math.random() * 1.6 + 0.3,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.6 + 0.1,
      drift: (Math.random() - 0.5) * 0.25,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,150,58,${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.2 })
        .fromTo(".hero-label", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
        .fromTo(".hero-logo", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.35")
        .fromTo(".hero-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.45")
        .fromTo(".hero-sub", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo(".hero-btns", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .fromTo(".hero-scroll-bar", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.1");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Full bleed Radha Krishna background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/artworks/radha-krishna-mythological-painting-commission.jpg"
          alt="Radha Krishna mythological painting — custom art commission by AgasthyaKala Kerala"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark gradient overlay — bottom heavy so text at centre is readable */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.45) 40%, rgba(8,8,8,0.72) 100%)"
        }} />
        {/* Extra vignette at edges */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(8,8,8,0.55) 100%)"
        }} />
      </div>

      {/* Gold particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center px-5 pt-24 pb-16 w-full max-w-5xl mx-auto" style={{ zIndex: 2 }}>

        <span className="hero-label label mb-7" style={{ color: "rgba(201,150,58,0.9)" }}>✦ Payyannur, Kerala · Custom Art Studio ✦</span>

        <div className="hero-logo mb-6">
          <Image src="/logo/logo.png" alt="AgasthyaKala" width={260} height={65} priority
            style={{ height: "clamp(140px,18vw,160px)", width: "auto", filter: "brightness(10) drop-shadow(0 4px 22px rgba(201,150,58,0.4))" }} />
        </div>

        {/* AGASTHYAKALA — single line, AGASTHYA white + KALA gold outline */}
        <div className="overflow-hidden w-full mb-6">
          <h1 className="hero-title font-display font-black uppercase leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(28px,6.5vw,88px)", letterSpacing: "-0.02em", lineHeight: 0.9 }}>
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)", WebkitTextFillColor: "transparent" }}>AGASTHYA</span><span style={{ WebkitTextStroke: "2px var(--gold)", WebkitTextFillColor: "transparent" }}>KALA</span>
          </h1>
        </div>

        <p className="hero-sub font-serif font-light italic mb-10"
          style={{ fontSize: "clamp(14px,1.7vw,20px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 480, letterSpacing: "0.03em" }}>
          Custom Paintings &amp; Portraits from Photo —<br className="hidden sm:block" />
          every stroke a story, every piece uniquely yours.
        </p>

        {/* Buttons */}
        <div className="hero-btns flex justify-center mt-2" style={{ gap: 0 }}>
          {/* Gold filled → hover transparent gold outline */}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "clamp(170px,19vw,220px)", height: "50px", fontFamily: "var(--display)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", background: "var(--gold)", color: "#fff", border: "1.5px solid var(--gold)", cursor: "pointer", textDecoration: "none", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "var(--gold)"; el.style.letterSpacing = "0.36em"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "var(--gold)"; el.style.color = "#fff"; el.style.letterSpacing = "0.28em"; }}>
            <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: "currentColor", flexShrink: 0 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Order via WhatsApp
          </a>
          {/* White outline → hover solid white, dark text */}
          <a href="#gallery" onClick={e => { e.preventDefault(); document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "clamp(170px,19vw,220px)", height: "50px", fontFamily: "var(--display)", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", background: "transparent", color: "rgba(255,255,255,0.8)", border: "1.5px solid rgba(255,255,255,0.45)", cursor: "pointer", textDecoration: "none", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#fff"; el.style.color = "var(--black)"; el.style.borderColor = "#fff"; el.style.letterSpacing = "0.36em"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,0.8)"; el.style.borderColor = "rgba(255,255,255,0.45)"; el.style.letterSpacing = "0.28em"; }}>
            View Gallery
          </a>
        </div>
      </div>

      {/* Scroll line */}
      <div className="hero-scroll-bar absolute bottom-6 left-1/2 -translate-x-1/2" style={{ zIndex: 2 }}>
        <div className="w-px h-10 mx-auto" style={{ background: "linear-gradient(to bottom, var(--gold), transparent)", animation: "scrollLine 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}