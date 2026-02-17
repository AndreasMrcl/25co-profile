"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const F = { playfair: '"Playfair Display", Georgia, serif', dm: '"DM Sans", system-ui, sans-serif' };
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
      const bgImg = section.querySelector(".st-bg img");
      if (bgImg) gsap.fromTo(bgImg, { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 } });

      countersRef.current.forEach((counter, i) => {
        if (!counter) return;
        gsap.fromTo(counter, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: counter, start: "top 85%" } });
        const numEl = counter.querySelector(".st-num");
        if (!numEl) return;
        const proxy = { val: 0 };
        ScrollTrigger.create({
          trigger: counter, start: "top 80%", once: true,
          onEnter: () => gsap.to(proxy, { val: stats[i].value, duration: 2.2, ease: "power2.out", onUpdate: () => { numEl.textContent = Math.round(proxy.val).toString(); } }),
        });
      });

      gsap.fromTo(".st-quote", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".st-quote", start: "top 80%" } });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", padding: "120px 0", overflow: "hidden" }}>
      <div className="st-bg" style={{ position: "absolute", inset: 0, transform: "scale(1.12)" }}>
        <Image src="/images/space3.jpg" alt="25co space" fill className="object-cover" sizes="100vw" />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,16,8,0.92) 0%, rgba(45,35,24,0.88) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%, rgba(184,134,92,0.15), transparent 60%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", marginBottom: "80px" }}>
          {stats.map((stat, i) => (
            <div key={stat.label} ref={el => { if (el) countersRef.current[i] = el; }} style={{ borderLeft: "1px solid rgba(184,134,92,0.3)", paddingLeft: "24px" }}>
              <div style={{ fontFamily: F.playfair, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "white", lineHeight: 1, marginBottom: "8px" }}>
                <span className="st-num">0</span><span style={{ color: "var(--muted-tan)" }}>{stat.suffix}</span>
              </div>
              <div style={{ fontFamily: F.dm, fontSize: "0.88rem", fontWeight: 500, color: "white", marginBottom: "4px" }}>{stat.label}</div>
              <div style={{ fontFamily: F.dm, fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>{stat.desc}</div>
            </div>
          ))}
        </div>

        <div className="st-quote" style={{ maxWidth: "820px" }}>
          <div style={{ width: "48px", height: "1px", background: "var(--warm-brown)", marginBottom: "28px" }} />
          <blockquote style={{ fontFamily: F.playfair, fontSize: "clamp(1.6rem, 3vw, 2.8rem)", fontStyle: "italic", color: "white", lineHeight: 1.35, margin: "0 0 20px" }}>
            "Tempat di mana ide-ide besar lahir, koneksi terjalin, dan kopi terbaik dinikmati."
          </blockquote>
          <cite style={{ fontFamily: F.dm, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted-tan)", fontStyle: "normal" }}>— 25co Team, Keprabon Solo</cite>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "60px" }}>
          {["Free WiFi", "24/7 AC", "Meeting Room", "Cozy Lounge", "Specialty Coffee", "Private Desk", "Power Outlet"].map(feat => (
            <span key={feat} style={{ fontFamily: F.dm, padding: "8px 16px", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", letterSpacing: "0.1em", cursor: "default", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--warm-brown)"; e.currentTarget.style.color = "var(--muted-tan)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
              {feat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
