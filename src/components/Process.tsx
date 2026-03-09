"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WA_ORDER_URL, IG_URL } from "@/lib/constants";
gsap.registerPlugin(ScrollTrigger);

const NODE_SIZE = 10;
const ABOVE_H = 180;

const steps = [
  {
    num: "01",
    title: "Choose Your Art",
    desc: "Browse our gallery or share your own concept. Any photo, portrait or idea — we bring it to life exactly as you envision.",
  },
  {
    num: "02",
    title: "Contact Us",
    desc: "Reach us via WhatsApp or Instagram DM. Tell us your vision and we'll guide you through the process.",
  },
  {
    num: "03",
    title: "Send & Confirm",
    desc: "Share your reference photo and preferred size. We confirm details and pricing before starting.",
  },
  {
    num: "04",
    title: "Receive Your Art",
    desc: "Your handcrafted artwork is completed and delivered. You can request progress updates anytime.",
  },
];

function StepContent({ step }: { step: typeof steps[0] }) {
  return (
    <div>
      <span
        style={{
          fontFamily: "var(--font-cinzel)",
          fontSize: "9px",
          letterSpacing: "0.35em",
          color: "var(--gold, #c9a84c)",
          textTransform: "uppercase",
          opacity: 0.8,
          display: "block",
          marginBottom: 10,
        }}
      >
        Step {step.num}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-cormorant)",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(20px, 2.2vw, 30px)",
          margin: "0 0 10px",
          color: "#f0ece4",
          lineHeight: 1.1,
          letterSpacing: "0.02em",
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(12px, 0.9vw, 13px)",
          lineHeight: 1.8,
          color: "rgba(240,236,228,0.45)",
          maxWidth: 230,
          letterSpacing: "0.04em",
        }}
      >
        {step.desc}
      </p>
    </div>
  );
}

function TimelineStep({ step, i }: { step: typeof steps[0]; i: number }) {
  const isAbove = i % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 12px",
      }}
    >
      <div
        style={{
          height: ABOVE_H,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: 24,
        }}
      >
        {isAbove && <StepContent step={step} />}
      </div>

      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: NODE_SIZE,
            height: NODE_SIZE,
            borderRadius: "50%",
            background: "var(--gold, #c9a84c)",
            boxShadow: "0 0 0 3px rgba(201,168,76,0.15), 0 0 12px rgba(201,168,76,0.2)",
            flexShrink: 0,
            zIndex: 2,
          }}
        />
      </div>

      <div style={{ height: ABOVE_H, width: "100%", paddingTop: 24 }}>
        {!isAbove && <StepContent step={step} />}
      </div>
    </motion.div>
  );
}

export default function Process() {
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ".process-eyebrow",
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      }
    );
    gsap.fromTo(
      ".process-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.9, delay: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
      }
    );
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
      }
    );
  }, []);

  const lineTop = ABOVE_H + NODE_SIZE / 2;

  return (
    <section
      id="process"
      style={{
        background: "#0a0a0a",
        padding: "clamp(80px,10vw,120px) clamp(20px,5vw,64px)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div ref={titleRef} style={{ marginBottom: 80 }}>
          <p
            className="process-eyebrow"
            style={{
              fontFamily: "var(--font-cinzel)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--gold, #c9a84c)",
              marginBottom: 16,
              opacity: 0,
            }}
          >
            The Process
          </p>
          <h2
            className="process-title"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(48px, 8vw, 100px)",
              lineHeight: 0.88,
              color: "#f0ece4",
              letterSpacing: "-0.01em",
              opacity: 0,
            }}
          >
            From <em style={{ color: "var(--gold, #c9a84c)", fontStyle: "italic" }}>Idea</em>
            <br />
            to Art
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              top: lineTop,
              left: 0,
              right: 0,
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25) 20%, rgba(201,168,76,0.25) 80%, transparent)",
              transformOrigin: "left center",
            }}
          />
          <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
            {steps.map((s, i) => (
              <TimelineStep key={i} step={s} i={i} />
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 80,
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href={WA_ORDER_URL} target="_blank" rel="noopener noreferrer" className="process-cta-primary">
            Start on WhatsApp
          </a>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="process-cta-secondary">
            Instagram DM
          </a>
        </div>

      </div>
    </section>
  );
}