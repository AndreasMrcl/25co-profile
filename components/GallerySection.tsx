"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { src: "/images/hero-mirror.jpg", alt: "Mirror Art Wall", span: "tall" },
  { src: "/images/exterior.jpg", alt: "25co Exterior", span: "normal" },
  { src: "/images/outdoor.jpg", alt: "Outdoor Seating", span: "normal" },
  { src: "/images/interior-work.jpg", alt: "Working Space", span: "tall" },
  { src: "/images/merch.jpg", alt: "25co Merch", span: "normal" },
  { src: "/images/xmas1.jpg", alt: "Special Moments", span: "normal" },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        ".gallery-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-header",
            start: "top 85%",
          },
        }
      );

      // Gallery items stagger
      const items = section.querySelectorAll(".gallery-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
            delay: (i % 3) * 0.12,
          }
        );

        // Parallax on images
        const img = item.querySelector("img");
        if (img) {
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
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: "var(--warm-cream)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="gallery-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span
              className="text-[var(--warm-brown)] text-xs tracking-widest uppercase font-sans block mb-4"
              style={{ letterSpacing: "0.25em", fontSize: "0.65rem" }}
            >
              Gallery
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 700,
                color: "var(--dark-espresso)",
                lineHeight: 1.1,
              }}
            >
              Momen{" "}
              <em style={{ color: "var(--warm-brown)", fontStyle: "italic", fontWeight: 400 }}>
                Tak Terlupakan
              </em>
            </h2>
          </div>
          <p
            className="text-[var(--charcoal)]/60 max-w-xs font-sans text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Setiap kunjungan ke 25co adalah pengalaman yang selalu ingin dikenang.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-item relative overflow-hidden cursor-pointer group ${
                item.span === "tall" ? "row-span-2" : ""
              }`}
              style={{
                aspectRatio: item.span === "tall" ? "3/4" : "1/1",
              }}
              onClick={() => setLightbox(item.src)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5"
                style={{ background: "linear-gradient(to top, rgba(26,16,8,0.8) 0%, transparent 50%)" }}
              >
                <span
                  className="text-white font-sans text-sm"
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem" }}
                >
                  {item.alt}
                </span>
              </div>
              {/* Expand icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--warm-brown)" strokeWidth="2">
                  <path d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://instagram.com/25co.space"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[var(--warm-brown)] text-[var(--warm-brown)] px-8 py-4 text-xs tracking-widest uppercase font-sans hover:bg-[var(--warm-brown)] hover:text-white transition-all duration-300"
            style={{ letterSpacing: "0.15em", fontFamily: "var(--font-dm-sans)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow @25co.space
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Gallery"
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                style={{ maxHeight: "85vh" }}
              />
              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={() => setLightbox(null)}
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
