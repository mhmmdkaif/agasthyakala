"use client"
import Image from "next/image";
import { IG_URL, PHONE_TEL, PHONE, NAV_LINKS } from "@/lib/constants";

const links = NAV_LINKS;

export default function Footer() {
  return (
    <footer className="py-12 px-[6vw] pb-7" style={{ background: "var(--black)" }}>
      <div className="w-full h-px mb-12" style={{ background: "linear-gradient(90deg,transparent,var(--gold),transparent)" }} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div>
          <Image src="/logo/logo.png" alt="AgasthyaKala" width={110} height={34} className="h-8 w-auto mb-3.5"
            style={{ filter: "brightness(1.8) sepia(0.6) hue-rotate(5deg) saturate(1.5)" }} />
          <div style={{ fontFamily: "var(--display)", fontSize: "12px", letterSpacing: "0.18em", color: "var(--gold)", marginBottom: "3px" }}>AgasthyaKala</div>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", marginBottom: "12px" }}>Custom Art Studio · Payyannur, Kerala</div>
          <p style={{ fontFamily: "var(--serif)", fontSize: "13px", lineHeight: 1.8, color: "rgba(255,255,255,0.38)" }}>
            Handcrafted paintings, portraits and cultural artworks. Commission your unique masterpiece today.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--display)", fontSize: "8px", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "16px" }}>Navigate</h4>
          <ul className="flex flex-col gap-2.5 list-none">
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} style={{ fontFamily: "var(--serif)", fontSize: "14px", color: "rgba(255,255,255,0.4)", transition: "color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--display)", fontSize: "8px", letterSpacing: "0.45em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "16px" }}>Contact</h4>
          <address style={{ fontStyle: "normal", fontFamily: "var(--serif)", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.9 }}>
            AgasthyaKala Edat<br />Near Malara Oil Mill<br />Payyannur, Kerala 670327<br /><br />
            <a href={PHONE_TEL} style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{PHONE}</a><br />
            <a href={IG_URL} target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(201,150,58,0.65)", transition: "opacity 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.65")}>@_agasthya_kala_</a>
          </address>
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap gap-2.5 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p suppressHydrationWarning style={{ fontFamily: "var(--display)", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>© {new Date().getFullYear()} AgasthyaKala · All Rights Reserved</p>
        <p style={{ fontFamily: "var(--display)", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,150,58,0.35)" }}>Custom Paintings · Portrait Artist · Kerala</p>
      </div>
    </footer>
  );
}
