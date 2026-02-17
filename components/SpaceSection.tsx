"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const F = { playfair: '"Playfair Display", Georgia, serif', dm: '"DM Sans", system-ui, sans-serif' };
const spaces = [
  { title: "Open Workspace", desc: "Area kerja terbuka dengan pencahayaan alami dan suasana kolaboratif.", img: "/images/interior-work.jpg", tag: "Coworking", tall: true },
  { title: "Outdoor Terrace", desc: "Nikmati udara segar sambil bekerja di teras outdoor yang nyaman.", img: "/images/outdoor.jpg", tag: "Outdoor", tall: false },
  { title: "Gallery Wall", desc: "Ruang artistik dengan dekorasi unik yang menjadi spot foto favorit.", img: "/images/hero-wall.jpg", tag: "Aesthetic", tall: true },
  { title: "Coffee Corner", desc: "Bar kopi specialty dengan barista berpengalaman.", img: "/images/bar.jpg", tag: "Coffee Bar", tall: false },
];

export default function SpaceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".sp-header", { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".sp-header", start: "top 85%" } });
      section.querySelectorAll(".space-card").forEach((card, i) => {
        gsap.fromTo(card, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } });
        const img = card.querySelector("img");
        if (img) gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5 } });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="space" style={{ padding: "120px 0", background: "var(--dark-espresso)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "33%", height: "100%", background: "radial-gradient(ellipse at right, rgba(184,134,92,0.12), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <div className="sp-header" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", marginBottom: "56px" }}>
          <div>
            <span style={{ display: "block", fontFamily: F.dm, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--muted-tan)", marginBottom: "16px" }}>Our Spaces</span>
            <h2 style={{ fontFamily: F.playfair, fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, color: "white", lineHeight: 1.1, margin: 0 }}>
              Setiap Sudut <em style={{ color: "var(--muted-tan)", fontStyle: "italic", fontWeight: 400 }}>Punya Cerita</em>
            </h2>
          </div>
          <p style={{ fontFamily: F.dm, fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", maxWidth: "280px", lineHeight: 1.65, margin: 0 }}>
            Temukan area yang paling cocok dengan mood dan kebutuhanmu hari ini.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {spaces.map((sp) => (
            <div key={sp.title} className="space-card" style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: sp.tall ? "2/3" : "2/2.5" }}>
              <Image src={sp.img} alt={sp.title} fill className="object-cover" sizes="25vw" style={{ transition: "transform 0.7s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,16,8,0.95) 0%, rgba(26,16,8,0.3) 50%, transparent 100%)", opacity: 0.72 }} />
              <span style={{ position: "absolute", top: "14px", left: "14px", background: "rgba(184,134,92,0.9)", color: "white", fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "5px 10px", fontFamily: F.dm }}>{sp.tag}</span>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
                <h3 style={{ fontFamily: F.playfair, color: "white", fontSize: "1.1rem", fontWeight: 600, margin: "0 0 6px" }}>{sp.title}</h3>
                <p className="space-card-desc" style={{ fontFamily: F.dm, color: "rgba(255,255,255,0.55)", fontSize: "0.72rem", lineHeight: 1.6, margin: 0 }}>{sp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
