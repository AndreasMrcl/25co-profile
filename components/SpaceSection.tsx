"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const spaces = [
  {
    title: "Open Workspace",
    desc: "Area kerja terbuka dengan pencahayaan alami dan suasana kolaboratif yang menyenangkan.",
    img: "/images/interior-work.jpg",
    tag: "Coworking",
  },
  {
    title: "Outdoor Terrace",
    desc: "Nikmati udara segar sambil bekerja di teras outdoor yang nyaman dengan pemandangan kota.",
    img: "/images/outdoor.jpg",
    tag: "Outdoor",
  },
  {
    title: "The Gallery Wall",
    desc: "Ruang artistik dengan dekorasi unik yang menjadi spot foto favorit pengunjung.",
    img: "/images/hero-mirror.jpg",
    tag: "Aesthetic",
  },
  {
    title: "Coffee Corner",
    desc: "Bar kopi specialty dengan barista berpengalaman yang siap menyeduh kopi terbaik untukmu.",
    img: "/images/space3.jpg",
    tag: "Coffee Bar",
  },
];

export default function SpaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      // Horizontal scroll for the cards track
      const cards = track.querySelectorAll(".space-card");
      
      gsap.fromTo(
        cards,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: track,
            start: "top 80%",
          },
        }
      );

      // Parallax on each card image
      cards.forEach((card) => {
        const img = card.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
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
      id="space"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: "var(--dark-espresso)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-5"
        style={{
          background: "radial-gradient(ellipse at right, var(--warm-brown), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <span
              className="text-[var(--warm-brown)] text-xs tracking-widest uppercase font-sans block mb-4"
              style={{ letterSpacing: "0.25em", fontSize: "0.65rem" }}
            >
              Our Spaces
            </span>
            <h2
              className="text-white leading-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Setiap Sudut{" "}
              <em style={{ color: "var(--muted-tan)", fontStyle: "italic", fontWeight: 400 }}>
                Punya Cerita
              </em>
            </h2>
          </div>
          <p
            className="text-white/50 max-w-sm font-sans leading-relaxed"
            style={{ fontSize: "0.9rem", fontFamily: "var(--font-dm-sans)" }}
          >
            Temukan area yang paling cocok dengan mood dan kebutuhanmu hari ini.
          </p>
        </div>

        {/* Space Cards Grid */}
        <div
          ref={trackRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {spaces.map((space, i) => (
            <div
              key={space.title}
              className="space-card group relative cursor-pointer overflow-hidden"
              style={{
                aspectRatio: i % 2 === 0 ? "2/3" : "2/2.5",
              }}
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={space.img}
                  alt={space.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,16,8,0.95) 0%, rgba(26,16,8,0.4) 50%, transparent 100%)",
                  opacity: 0.7,
                }}
              />

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 bg-[var(--warm-brown)]/90 text-white text-xs tracking-widest uppercase"
                  style={{ fontSize: "0.55rem", letterSpacing: "0.15em", fontFamily: "var(--font-dm-sans)" }}
                >
                  {space.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="text-white mb-2"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                  }}
                >
                  {space.title}
                </h3>
                <p
                  className="text-white/60 text-xs leading-relaxed font-sans max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {space.desc}
                </p>
                <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span
                    className="text-[var(--muted-tan)] text-xs tracking-widest uppercase"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.15em", fontFamily: "var(--font-dm-sans)" }}
                  >
                    Explore
                  </span>
                  <div className="h-px w-8 bg-[var(--muted-tan)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
