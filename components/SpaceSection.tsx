"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const F = { playfair: '"Playfair Display", Georgia, serif', dm: '"DM Sans", system-ui, sans-serif' };

const spaces = [
  { title: "Open Workspace", desc: "Area kerja terbuka dengan pencahayaan alami dan suasana kolaboratif.", img: "/images/interior-work.jpg", tag: "Coworking", speed: -1.8, rotate: -1.5 },
  { title: "Outdoor Terrace", desc: "Nikmati udara segar sambil bekerja di teras outdoor yang nyaman.", img: "/images/outdoor.jpg", tag: "Outdoor", speed: -0.6, rotate: 1.2 },
  { title: "Gallery Wall", desc: "Ruang artistik dengan dekorasi unik yang menjadi spot foto favorit.", img: "/images/hero-wall.jpg", tag: "Aesthetic", speed: -2.4, rotate: -0.8 },
  { title: "Coffee Corner", desc: "Bar kopi specialty dengan barista berpengalaman.", img: "/images/bar.jpg", tag: "Coffee Bar", speed: -1.2, rotate: 1.8 },
];

export default function SpaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // ── Header reveal ──────────────────────────────────────────
      gsap.fromTo(".sp-eyebrow", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } });
      gsap.fromTo(".sp-h2-line", { clipPath: "inset(0 100% 0 0)", opacity: 0 }, { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", scrollTrigger: { trigger: section, start: "top 75%" } });
      gsap.fromTo(".sp-bg-word", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 85%" } });

      // ── Background word slow parallax ───────────────────────────
      gsap.to(".sp-bg-word", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
      });

      // ── Cards: each moves at its own speed (multi-depth parallax) ─
      section.querySelectorAll<HTMLElement>(".sp-card-wrap").forEach((wrap) => {
        const speed = parseFloat(wrap.dataset.speed || "0");

        // Different vertical offset per card — staggered depth
        gsap.to(wrap, {
          y: speed * 80,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });

        // Image inner parallax (opposite direction for depth illusion)
        const imgLayer = wrap.querySelector(".sp-img-layer");
        if (imgLayer)
          gsap.fromTo(imgLayer, { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 1.5 } });

        // Clip-path reveal on scroll-enter
        gsap.fromTo(wrap, { clipPath: "inset(100% 0 0 0)", opacity: 0 }, {
          clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1.1, ease: "power4.out",
          scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
        });
      });

      // ── Mouse tilt on each card ─────────────────────────────────
      const cards = section.querySelectorAll<HTMLElement>(".sp-card-inner");
      cards.forEach((card) => {
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const cx = (e.clientX - rect.left) / rect.width - 0.5;
          const cy = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, { rotateY: cx * 12, rotateX: -cy * 10, scale: 1.03, duration: 0.5, ease: "power2.out", transformPerspective: 800 });
        };
        const onLeave = () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.6)", transformPerspective: 800 });
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });

    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .sp-card-inner {
          transform-style: preserve-3d;
          transition: box-shadow 0.5s ease;
          cursor: pointer;
        }
        .sp-card-inner:hover {
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }

        /* Image zoom on hover */
        .sp-card-inner .sp-img-layer {
          transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .sp-card-inner:hover .sp-img-layer {
          transform: scale(1.08) !important;
        }

        /* Tag badge */
        .sp-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 3;
          background: rgba(184,134,92,0.9);
          backdrop-filter: blur(4px);
          color: white;
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 5px 11px;
          font-family: "DM Sans", sans-serif;
          transform: translateZ(20px);
        }

        /* Card number */
        .sp-num {
          position: absolute;
          top: 14px;
          right: 16px;
          z-index: 3;
          font-family: "Playfair Display", serif;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
          transform: translateZ(20px);
        }

        /* Content container */
        .sp-card-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 22px;
          z-index: 2;
          transform: translateZ(30px) translateY(0);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sp-card-inner:hover .sp-card-content {
          transform: translateZ(30px) translateY(-14px);
        }

        .sp-card-title {
          font-family: "Playfair Display", Georgia, serif;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          line-height: 1.2;
        }

        .sp-card-desc {
          font-family: "DM Sans", system-ui, sans-serif;
          color: rgba(255,255,255,0.7);
          font-size: 0.7rem;
          line-height: 1.6;
          margin: 0;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(6px);
          transition: max-height 0.4s ease, opacity 0.35s ease 0.05s, transform 0.4s cubic-bezier(0.22,1,0.36,1) 0.05s, margin 0.35s ease;
        }
        .sp-card-inner:hover .sp-card-desc {
          max-height: 80px;
          opacity: 1;
          transform: translateY(0);
          margin-top: 6px;
        }

        /* Thin accent line that grows on hover */
        .sp-accent-line {
          position: absolute;
          bottom: 0; left: 0;
          width: 0;
          height: 2px;
          background: var(--warm-brown);
          z-index: 4;
          transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sp-card-inner:hover .sp-accent-line {
          width: 100%;
        }

        /* Overlay */
        .sp-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(26,16,8,0.97) 0%, rgba(26,16,8,0.25) 55%, transparent 100%);
          z-index: 1;
          transition: background 0.5s ease;
        }
        .sp-card-inner:hover .sp-overlay {
          background: linear-gradient(to top, rgba(26,16,8,0.99) 0%, rgba(26,16,8,0.45) 60%, transparent 100%);
        }

        /* Scroll indicator line connecting cards */
        .sp-connector {
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(184,134,92,0.2), transparent);
          transform: translateX(-50%);
          pointer-events: none;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="space"
        style={{ padding: "140px 0 180px", background: "var(--dark-espresso)", position: "relative", overflow: "hidden" }}
      >
        {/* Ambient glow blobs */}
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(184,134,92,0.08), transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "-8%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,94,60,0.06), transparent 70%)", pointerEvents: "none", filter: "blur(60px)" }} />

        {/* Giant bg word */}
        <div className="sp-bg-word" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontFamily: F.playfair, fontSize: "clamp(12rem, 22vw, 26rem)", fontWeight: 900, color: "transparent", WebkitTextStroke: "1px rgba(184,134,92,0.06)", letterSpacing: "-0.05em", pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", zIndex: 0 }}>
          SPACE
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "0 64px" }}>

          {/* Header */}
          <div style={{ marginBottom: "80px" }}>
            <span className="sp-eyebrow" style={{ display: "inline-block", fontFamily: F.dm, fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--muted-tan)", marginBottom: "20px" }}>
              ◈ Our Spaces
            </span>
            <div style={{ overflow: "hidden" }}>
              <div className="sp-h2-line" style={{ fontFamily: F.playfair, fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 700, color: "white", lineHeight: 1.05, display: "block" }}>
                Setiap Sudut
              </div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div className="sp-h2-line" style={{ fontFamily: F.playfair, fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 400, fontStyle: "italic", color: "var(--muted-tan)", lineHeight: 1.05, display: "block" }}>
                Punya Cerita
              </div>
            </div>
          </div>

          {/* Cards track — different heights, offset vertically */}
          <div
            ref={trackRef}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", alignItems: "end" }}
          >
            {spaces.map((sp, i) => {
              // Alternate heights: tall / short / tall / short
              const heights = ["520px", "380px", "580px", "420px"];
              // Stagger starting position
              const topOffsets = ["0px", "60px", "-30px", "90px"];

              return (
                <div
                  key={sp.title}
                  className="sp-card-wrap"
                  data-speed={sp.speed}
                  style={{
                    position: "relative",
                    marginTop: topOffsets[i],
                    clipPath: "inset(100% 0 0 0)", // will be animated
                  }}
                >
                  <div
                    className="sp-card-inner"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      height: heights[i],
                      background: "var(--charcoal)",
                    }}
                  >
                    {/* Parallax image */}
                    <div
                      className="sp-img-layer"
                      style={{ position: "absolute", inset: "-15% 0", height: "130%", willChange: "transform" }}
                    >
                      <Image
                        src={sp.img}
                        alt={sp.title}
                        fill
                        className="object-cover"
                        sizes="25vw"
                        style={{ pointerEvents: "none" }}
                      />
                    </div>

                    <div className="sp-overlay" />
                    <div className="sp-accent-line" />

                    <span className="sp-tag">{sp.tag}</span>
                    <span className="sp-num">0{i + 1}</span>

                    <div className="sp-card-content">
                      <h3 className="sp-card-title">{sp.title}</h3>
                      <p className="sp-card-desc">{sp.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom caption */}
          <div style={{ marginTop: "64px", display: "flex", justifyContent: "flex-end" }}>
            <p style={{ fontFamily: F.dm, fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", maxWidth: "300px", textAlign: "right", lineHeight: 1.8 }}>
              Temukan area yang paling cocok<br />dengan mood dan kebutuhanmu
            </p>
          </div>
        </div>
      </section>
    </>
  );
}