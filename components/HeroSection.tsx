"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

const F = {
  playfair: '"Playfair Display", Georgia, serif',
  cormorant: '"Cormorant Garamond", Georgia, serif',
  dm: '"DM Sans", system-ui, sans-serif',
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;
    const ctx = gsap.context(() => {
      gsap.to(bg, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      if (overlayRef.current)
        gsap.to(overlayRef.current, {
          opacity: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "80% top",
            scrub: true,
          },
        });
    }, section);
    return () => ctx.revert();
  }, []);

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };
  const line = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          transform: "scale(1.12)",
          willChange: "transform",
        }}
      >
        <Image
          src="/images/hero-main.jpg"
          alt="25co Space"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(26,16,8,0.4) 0%, rgba(26,16,8,0.65) 100%)",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(184,134,92,0.18) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          style={{
            fontFamily: F.dm,
            color: "var(--muted-tan)",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          Keprabon · Solo · Since 2024
        </motion.p>

        <motion.div variants={stagger} initial="hidden" animate="visible">
          {[
            { text: "Coffee", weight: 700, italic: false, color: "white" },
            {
              text: "& Space",
              weight: 400,
              italic: true,
              color: "var(--muted-tan)",
            },
            { text: "Redefined.", weight: 900, italic: false, color: "white" },
          ].map((w) => (
            <div
              key={w.text}
              style={{ overflow: "hidden", marginBottom: "4px" }}
            >
              <motion.h1
                variants={line}
                style={{
                  fontFamily: F.playfair,
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  fontWeight: w.weight,
                  fontStyle: w.italic ? "italic" : "normal",
                  color: w.color,
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                {w.text}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            fontFamily: F.dm,
            marginTop: "36px",
            color: "rgba(255,255,255,0.65)",
            maxWidth: "380px",
            margin: "36px auto 0",
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
        >
          Ruang kerja yang nyaman, kopi yang luar biasa, dan komunitas yang
          menginspirasi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            marginTop: "48px",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#space"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#space")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontFamily: F.dm,
              padding: "14px 32px",
              background: "var(--warm-brown)",
              color: "white",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--deep-brown)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--warm-brown)")
            }
          >
            Explore Space
          </a>
          <a
            href="#coffee"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#coffee")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontFamily: F.dm,
              padding: "14px 32px",
              border: "1px solid rgba(255,255,255,0.45)",
              color: "white",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "white";
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Our Coffee
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: F.dm,
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.58rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "rgba(255,255,255,0.2)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "var(--warm-brown)",
            }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
