"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { WA_URL, IG_URL, FB_URL, MAPS_URL, PHONE } from "@/lib/constants";

const contacts = [
  {
    label: "WhatsApp",
    value: PHONE,
    href: WA_URL,
    icon: "💬",
  },
  {
    label: "Instagram",
    value: "@_agasthya_kala_",
    href: IG_URL,
    icon: "📸",
  },
  {
    label: "Facebook",
    value: "AgasthyaKala",
    href: FB_URL,
    icon: "📘",
  },
  {
    label: "Studio Location",
    value: "Edat, Near Malara Oil Mill, Payyannur 670327",
    href: MAPS_URL,
    icon: "📍",
  },
];

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="contact" className="relative py-20 px-[6vw] bg-white">

      {/* BACKGROUND IMAGE */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/artworks/pencil-portrait-from-photo-agasthyakala.jpg"
          alt=""
          fill
          className="object-cover"
          style={{
            filter: "blur(2px) brightness(0.18) saturate(0.4)",
            transform: "scale(1.05)",
          }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0.94)" }}
        />
      </div>

      <div className="relative max-w-[1100px] mx-auto">

        {/* TITLE */}

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="label">✦ Commission Your Art</span>

          <h2
            className="font-display font-black uppercase leading-none"
            style={{
              fontSize: "clamp(42px,7vw,100px)",
              letterSpacing: "-0.025em",
              color: "var(--black)",
            }}
          >
            Contact
            <br />
            <span style={{ color: "var(--gold)" }}>AgasthyaKala</span>
          </h2>
        </motion.div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-14 items-start">

          {/* CONTACT DETAILS */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 py-5 border-b no-underline group"
                style={{ borderColor: "rgba(0,0,0,0.08)" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{
                    background: "rgba(201,150,58,0.1)",
                    color: "var(--gold)",
                  }}
                >
                  {c.icon}
                </div>

                <div className="flex-1">
                  <span
                    className="font-display text-[8px] tracking-[0.4em] uppercase block"
                    style={{ color: "var(--black-light)" }}
                  >
                    {c.label}
                  </span>

                  <span
                    className="font-serif text-[15px]"
                    style={{ color: "var(--black)" }}
                  >
                    {c.value}
                  </span>
                </div>

                <span
                  className="font-display text-[11px]"
                  style={{ color: "var(--gold)" }}
                >
                  →
                </span>
              </a>
            ))}
          </motion.div>

          {/* MAP */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden"
            style={{ border: "1px solid rgba(201,150,58,0.25)" }}
          >
            <iframe
              src="https://www.google.com/maps?q=Payyannur%2C%20Kerala&output=embed"
              title="AgasthyaKala studio location — Payyannur, Kerala on Google Maps"
              width="100%"
              height="380"
              style={{
                border: "none",
                display: "block",
                filter: "grayscale(15%) contrast(1.05)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div
              className="absolute bottom-0 left-0 right-0 px-4 py-3"
              style={{
                background:
                  "linear-gradient(to top, rgba(247,244,239,0.98), transparent)",
              }}
            >
              <span
                className="font-display text-[8px] tracking-[0.3em] uppercase"
                style={{ color: "var(--gold)" }}
              >
                📍 Edat, Near Malara Oil Mill, Payyannur, Kerala 670327
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}