"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

const F = {
  playfair: '"Playfair Display", Georgia, serif',
  dm: '"DM Sans", system-ui, sans-serif',
};

// Each photo: custom size, rotation, position offset — editorial scattered layout
const photos = [
  { src: "/images/hero-wall.jpg",      alt: "Mirror Art Wall",   w: "340px", h: "460px", top: "0px",    left: "0px",   rotate: -2.5, zIndex: 3, delay: 0    },
  { src: "/images/exterior.jpg",       alt: "25co Exterior",     w: "260px", h: "320px", top: "60px",   left: "320px", rotate: 1.8,  zIndex: 2, delay: 0.08 },
  { src: "/images/outdoor.jpg",        alt: "Outdoor Seating",   w: "310px", h: "210px", top: "380px",  left: "240px", rotate: -1.2, zIndex: 4, delay: 0.16 },
  { src: "/images/interior-work.jpg",  alt: "Working Space",     w: "280px", h: "370px", top: "20px",   left: "560px", rotate: 2.2,  zIndex: 2, delay: 0.12 },
  { src: "/images/merch.jpg",          alt: "25co Merch",        w: "360px", h: "260px", top: "290px",  left: "490px", rotate: -1.8, zIndex: 5, delay: 0.2  },
  { src: "/images/xmas1.jpg",          alt: "Special Moments",   w: "240px", h: "340px", top: "80px",   left: "830px", rotate: 1.5,  zIndex: 3, delay: 0.24 },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Header ───────────────────────────────────────
      gsap.fromTo(".gl-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".gl-header", start: "top 85%" } });
      gsap.fromTo(".gl-title-line", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.3, stagger: 0.12, ease: "power4.out", scrollTrigger: { trigger: ".gl-header", start: "top 80%" } });

      // ── Scattered photos: fly in from random directions ─
      section.querySelectorAll<HTMLElement>(".gl-photo-wrap").forEach((wrap, i) => {
        const fromX = (Math.random() - 0.5) * 200;
        const fromY = 60 + Math.random() * 80;
        const delay = parseFloat(wrap.dataset.delay || "0");

        gsap.fromTo(wrap,
          { x: fromX, y: fromY, opacity: 0, rotate: 0 },
          {
            x: 0, y: 0, opacity: 1,
            rotate: parseFloat(wrap.dataset.rotate || "0"),
            duration: 1.4,
            delay,
            ease: "power4.out",
            scrollTrigger: { trigger: section, start: "top 70%", once: true },
          }
        );
      });

      // ── Each photo: subtle continuous float ──────────────
      section.querySelectorAll<HTMLElement>(".gl-photo-wrap").forEach((wrap, i) => {
        gsap.to(wrap, {
          y: `+=${6 + i * 3}`,
          duration: 2.5 + i * 0.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });

      // ── Parallax on the entire canvas when scrolling ─────
      if (canvasRef.current) {
        gsap.to(canvasRef.current, {
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      }

      // ── Large bg text parallax ───────────────────────────
      gsap.to(".gl-bg-text", {
        y: 80,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, section);

    // ── Mouse tilt per photo ──────────────────────────────
    const wraps = section.querySelectorAll<HTMLElement>(".gl-photo-wrap");
    const moveHandlers: Array<(e: MouseEvent) => void> = [];
    const leaveHandlers: Array<() => void> = [];

    wraps.forEach((wrap, i) => {
      const baseRotate = parseFloat(wrap.dataset.rotate || "0");

      const onMove = (e: MouseEvent) => {
        const rect = wrap.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(wrap, {
          rotateX: -cy * 14,
          rotateY: cx * 14,
          rotate: baseRotate + cx * 3,
          scale: 1.06,
          zIndex: 10,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 700,
          transformOrigin: "center center",
        });
      };

      const onLeave = () => {
        gsap.to(wrap, {
          rotateX: 0, rotateY: 0,
          rotate: baseRotate,
          scale: 1,
          zIndex: parseInt(wrap.dataset.zindex || "1"),
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
          transformPerspective: 700,
        });
      };

      wrap.addEventListener("mousemove", onMove);
      wrap.addEventListener("mouseleave", onLeave);
      moveHandlers.push(onMove);
      leaveHandlers.push(onLeave);
    });

    return () => {
      ctx.revert();
      wraps.forEach((wrap, i) => {
        wrap.removeEventListener("mousemove", moveHandlers[i]);
        wrap.removeEventListener("mouseleave", leaveHandlers[i]);
      });
    };
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <>
      <style>{`
        .gl-photo-wrap {
          position: absolute;
          transform-style: preserve-3d;
          cursor: pointer;
          will-change: transform;
        }
        .gl-photo-wrap .gl-photo-inner {
          overflow: hidden;
          width: 100%;
          height: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.15);
          transition: box-shadow 0.4s ease;
        }
        .gl-photo-wrap:hover .gl-photo-inner {
          box-shadow: 0 40px 100px rgba(0,0,0,0.45), 0 8px 32px rgba(0,0,0,0.25);
        }
        .gl-photo-wrap .gl-photo-img {
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
          transform-origin: center;
        }
        .gl-photo-wrap:hover .gl-photo-img {
          transform: scale(1.08);
        }

        /* Label hidden, reveals on hover */
        .gl-photo-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 12px 14px;
          background: linear-gradient(to top, rgba(26,16,8,0.92), transparent);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
          z-index: 2;
        }
        .gl-photo-wrap:hover .gl-photo-label {
          opacity: 1;
          transform: translateY(0);
        }

        /* Polaroid-style white border */
        .gl-photo-wrap.polaroid .gl-photo-inner {
          padding: 8px 8px 32px;
          background: white;
        }
        .gl-photo-wrap.polaroid .gl-photo-label {
          bottom: 2px;
          background: none;
          color: #555;
        }

        /* Accent corner decoration on hover */
        .gl-photo-corner {
          position: absolute;
          width: 18px; height: 18px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .gl-photo-corner.tl { top: -4px; left: -4px; border-top: 2px solid var(--warm-brown); border-left: 2px solid var(--warm-brown); }
        .gl-photo-corner.br { bottom: -4px; right: -4px; border-bottom: 2px solid var(--warm-brown); border-right: 2px solid var(--warm-brown); }
        .gl-photo-wrap:hover .gl-photo-corner {
          opacity: 1;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="gallery"
        style={{ padding: "140px 0 180px", background: "var(--warm-cream)", overflow: "hidden", position: "relative" }}
      >
        {/* Ambient blob */}
        <div style={{ position: "absolute", top: "30%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(184,134,92,0.06), transparent 70%)", pointerEvents: "none", filter: "blur(60px)" }} />

        {/* Giant background text */}
        <div className="gl-bg-text" style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%,-50%)", fontFamily: F.playfair, fontSize: "clamp(10rem, 20vw, 22rem)", fontWeight: 900, color: "transparent", WebkitTextStroke: "1px rgba(184,134,92,0.07)", letterSpacing: "-0.05em", pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", zIndex: 0 }}>
          GALLERY
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "0 64px" }}>

          {/* Header */}
          <div className="gl-header" style={{ marginBottom: "80px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "40px" }}>
            <div>
              <span className="gl-eyebrow" style={{ display: "inline-block", fontFamily: F.dm, fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--warm-brown)", marginBottom: "20px" }}>
                ◈ Gallery
              </span>
              <div style={{ overflow: "hidden" }}>
                <div className="gl-title-line" style={{ fontFamily: F.playfair, fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 700, color: "var(--dark-espresso)", lineHeight: 1.05, display: "block" }}>
                  Momen
                </div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <div className="gl-title-line" style={{ fontFamily: F.playfair, fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 400, fontStyle: "italic", color: "var(--warm-brown)", lineHeight: 1.05, display: "block" }}>
                  Tak Terlupakan
                </div>
              </div>
            </div>
            <div style={{ maxWidth: "280px", textAlign: "right" }}>
              <p style={{ fontFamily: F.dm, fontSize: "0.82rem", color: "rgba(45,35,24,0.5)", lineHeight: 1.75, margin: "0 0 24px" }}>
                Setiap kunjungan ke 25co adalah pengalaman yang selalu ingin dikenang.
              </p>
              <a
                href="https://www.instagram.com/25.co__/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: F.dm, display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 28px", border: "1px solid var(--warm-brown)", color: "var(--warm-brown)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--warm-brown)"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--warm-brown)"; }}
              >
                Follow @25co.space
              </a>
            </div>
          </div>

          {/* Scattered photo canvas */}
          <div
            ref={canvasRef}
            style={{ position: "relative", height: "640px", width: "100%" }}
          >
            {photos.map((photo, i) => (
              <div
                key={i}
                className="gl-photo-wrap"
                data-delay={photo.delay}
                data-rotate={photo.rotate}
                data-zindex={photo.zIndex}
                onClick={() => setLightbox(photo.src)}
                style={{
                  width: photo.w,
                  height: photo.h,
                  top: photo.top,
                  left: photo.left,
                  zIndex: photo.zIndex,
                  rotate: `${photo.rotate}deg`,
                  opacity: 0, // GSAP reveals this
                }}
              >
                <div className="gl-photo-inner" style={{ width: "100%", height: "100%", position: "relative" }}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="gl-photo-img object-cover"
                    sizes="340px"
                    style={{ pointerEvents: "none" }}
                  />
                  <div className="gl-photo-label">
                    <span style={{ fontFamily: F.dm, fontSize: "0.7rem", color: "white", letterSpacing: "0.05em" }}>{photo.alt}</span>
                  </div>
                </div>
                <div className="gl-photo-corner tl" />
                <div className="gl-photo-corner br" />
              </div>
            ))}

            {/* Floating quote — overlaps the photos */}
            <div style={{ position: "absolute", bottom: "0px", right: "0", zIndex: 6, maxWidth: "240px", pointerEvents: "none" }}>
              <p style={{ fontFamily: F.playfair, fontSize: "1.15rem", fontStyle: "italic", color: "var(--charcoal)", lineHeight: 1.55, margin: 0, opacity: 0.6 }}>
                "Be You Bravely"
              </p>
              <div style={{ width: "32px", height: "1px", background: "var(--warm-brown)", marginTop: "10px" }} />
              <span style={{ fontFamily: F.dm, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--warm-brown)", marginTop: "8px", display: "block" }}>25co Space</span>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
            >
              <motion.div
                initial={{ scale: 0.82, rotate: -3 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.82, rotate: 3 }}
                transition={{ type: "spring", damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                style={{ position: "relative" }}
              >
                <Image
                  src={lightbox}
                  alt=""
                  width={1200}
                  height={900}
                  style={{ maxHeight: "85vh", maxWidth: "90vw", width: "auto", objectFit: "contain", boxShadow: "0 40px 120px rgba(0,0,0,0.8)" }}
                />
                <button
                  onClick={() => setLightbox(null)}
                  style={{ position: "absolute", top: "12px", right: "12px", width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: "1rem", backdropFilter: "blur(8px)" }}
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}