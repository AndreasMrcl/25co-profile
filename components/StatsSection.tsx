"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: "+", label: "Happy Visitors", desc: "Per bulan" },
  { value: 25, suffix: "+", label: "Menu Kopi", desc: "Specialty & signatures" },
  { value: 3, suffix: " Lantai", label: "Ruang Tersedia", desc: "Indoor & outdoor" },
  { value: 100, suffix: "%", label: "WiFi Speed", desc: "Fiber optik stabil" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Parallax background image
      const bgImg = section.querySelector(".stats-bg-img");
      if (bgImg) {
        gsap.fromTo(
          bgImg,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Counter animations — use a stored proxy object, not an inline literal
      countersRef.current.forEach((counter, i) => {
        if (!counter) return;
        const stat = stats[i];
        const numEl = counter.querySelector(".counter-num");
        if (!numEl) return;

        // Fade-in the card
        gsap.fromTo(
          counter,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
            },
          }
        );

        // Count-up: store the proxy object in a variable so GSAP can
        // track it properly (avoids "Cannot set properties of undefined")
        const proxy = { val: 0 };
        ScrollTrigger.create({
          trigger: counter,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(proxy, {
              val: stat.value,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                numEl.textContent = Math.round(proxy.val).toString();
              },
            });
          },
        });
      });

      // Text reveal
      gsap.fromTo(
        ".stats-quote",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-quote",
            start: "top 80%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stats-bg-img absolute inset-0 scale-115">
          <Image
            src="/images/space3.jpg"
            alt="25co Space"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(26,16,8,0.92) 0%, rgba(45,35,24,0.88) 100%)",
          }}
        />
      </div>

      {/* Warm accent */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, var(--warm-brown) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-24">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { if (el) countersRef.current[i] = el; }}
              className="text-center lg:text-left border-l border-[var(--warm-brown)]/30 pl-6"
            >
              <div
                className="text-white leading-none mb-2"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 700,
                }}
              >
                <span className="counter-num">0</span>
                <span style={{ color: "var(--muted-tan)" }}>{stat.suffix}</span>
              </div>
              <div
                className="text-white font-sans font-medium mb-1"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem" }}
              >
                {stat.label}
              </div>
              <div
                className="text-white/40 font-sans"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem" }}
              >
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Big quote */}
        <div className="stats-quote max-w-4xl">
          <div className="w-12 h-px bg-[var(--warm-brown)] mb-8" />
          <blockquote
            className="text-white leading-tight mb-8"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.3,
            }}
          >
            "Tempat di mana ide-ide besar lahir, koneksi terjalin, dan kopi terbaik dinikmati."
          </blockquote>
          <cite
            className="text-[var(--muted-tan)] font-sans not-italic"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            — 25co Team, Keprabon Solo
          </cite>
        </div>

        {/* Feature badges */}
        <div className="mt-20 flex flex-wrap gap-4">
          {["Free WiFi", "24/7 AC", "Meeting Room", "Cozy Lounge", "Specialty Coffee", "Private Desk", "Power Outlet"].map(
            (feat) => (
              <span
                key={feat}
                className="px-4 py-2 border border-white/20 text-white/60 font-sans text-xs hover:border-[var(--warm-brown)] hover:text-[var(--muted-tan)] transition-colors duration-300 cursor-default"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  letterSpacing: "0.08em",
                }}
              >
                {feat}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}