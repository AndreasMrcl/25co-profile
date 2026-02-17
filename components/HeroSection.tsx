"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgImg = bgImgRef.current;

    if (!section || !bgImg) return;

    // Parallax on scroll
    gsap.to(bgImg, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Overlay darkening on scroll
    if (overlayRef.current) {
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
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const lineVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Parallax */}
      <div ref={bgImgRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-bg.jpg"
          alt="25co Space"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-50"
        style={{
          background: "linear-gradient(to bottom, rgba(26,16,8,0.4) 0%, rgba(26,16,8,0.65) 100%)",
        }}
      />

      {/* Warm tonal overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, var(--warm-brown) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-8"
        >
          <span
            className="text-[var(--muted-tan)] text-xs tracking-[0.35em] uppercase font-sans"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Keprabon · Solo · Since 2024
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          ref={titleRef}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <div className="overflow-hidden mb-2">
            <motion.h1
              variants={lineVariants}
              className="text-white leading-none"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(4rem, 10vw, 9rem)",
                fontWeight: 700,
              }}
            >
              Coffee
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              variants={lineVariants}
              className="leading-none italic"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(4rem, 10vw, 9rem)",
                fontWeight: 400,
                color: "var(--muted-tan)",
              }}
            >
              & Space
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="text-white leading-none"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(4rem, 10vw, 9rem)",
                fontWeight: 900,
              }}
            >
              Redefined.
            </motion.h1>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
          className="mt-10 text-white/70 max-w-md mx-auto font-sans text-base leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Ruang kerja yang nyaman, kopi yang luar biasa, dan komunitas yang menginspirasi — di jantung Kota Solo.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#space"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#space")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 bg-[var(--warm-brown)] text-white text-xs tracking-widest uppercase font-sans hover:bg-[var(--deep-brown)] transition-all duration-300"
            style={{ letterSpacing: "0.15em" }}
          >
            Explore Space
          </a>
          <a
            href="#coffee"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#coffee")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 border border-white/50 text-white text-xs tracking-widest uppercase font-sans hover:border-white hover:bg-white/10 transition-all duration-300"
            style={{ letterSpacing: "0.15em" }}
          >
            Our Coffee
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="text-white/50 text-xs tracking-widest uppercase"
          style={{ letterSpacing: "0.2em", fontSize: "0.6rem", fontFamily: "var(--font-dm-sans)" }}
        >
          Scroll
        </span>
        <div className="w-px h-12 bg-white/30 overflow-hidden">
          <motion.div
            className="w-full h-full bg-[var(--warm-brown)]"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
