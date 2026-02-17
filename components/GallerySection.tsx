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
const photos = [
  { src: "/images/hero-wall.jpg", alt: "Mirror Art Wall", tall: true },
  { src: "/images/exterior.jpg", alt: "25co Exterior", tall: false },
  { src: "/images/outdoor.jpg", alt: "Outdoor Seating", tall: false },
  { src: "/images/interior-work.jpg", alt: "Working Space", tall: false },
  { src: "/images/merch.jpg", alt: "25co Merch", tall: true },
  { src: "/images/xmas1.jpg", alt: "Special Moments", tall: false },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gl-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gl-header", start: "top 85%" },
        },
      );
      section.querySelectorAll(".gallery-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: item, start: "top 86%" },
          },
        );
        const img = item.querySelector("img");
        if (img)
          gsap.fromTo(
            img,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            },
          );
      });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{
        padding: "120px 0",
        background: "var(--warm-cream)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <div
          className="gl-header"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <div>
            <span
              style={{
                display: "block",
                fontFamily: F.dm,
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--warm-brown)",
                marginBottom: "16px",
              }}
            >
              Gallery
            </span>
            <h2
              style={{
                fontFamily: F.playfair,
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "var(--dark-espresso)",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Momen{" "}
              <em
                style={{
                  color: "var(--warm-brown)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                Tak Terlupakan
              </em>
            </h2>
          </div>
          <p
            style={{
              fontFamily: F.dm,
              fontSize: "0.88rem",
              color: "rgba(45,35,24,0.5)",
              maxWidth: "260px",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Setiap kunjungan ke 25co adalah pengalaman yang selalu ingin
            dikenang.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "280px",
            gap: "16px",
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => setLightbox(photo.src)}
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                gridRow: photo.tall ? "span 2" : "span 1",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="33vw"
                style={{ transition: "transform 0.7s ease" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <div
                className="gallery-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(26,16,8,0.78) 0%, transparent 50%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: F.dm,
                    fontSize: "0.75rem",
                    color: "white",
                  }}
                >
                  {photo.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <a
            href="https://instagram.com/25co.space"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: F.dm,
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              border: "1px solid var(--warm-brown)",
              color: "var(--warm-brown)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--warm-brown)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--warm-brown)";
            }}
          >
            Follow @25co.space
          </a>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              background: "rgba(0,0,0,0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.82 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.82 }}
              transition={{ type: "spring", damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative" }}
            >
              <Image
                src={lightbox}
                alt=""
                width={1200}
                height={900}
                style={{
                  maxHeight: "85vh",
                  maxWidth: "90vw",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
              <button
                onClick={() => setLightbox(null)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  border: "none",
                  color: "white",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
