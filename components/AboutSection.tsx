"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image parallax
      if (imgRef.current) {
        const img = imgRef.current.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: imgRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      }

      // Line expand animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Text reveal animations
      const textEls = section.querySelectorAll(".reveal-text");
      textEls.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      // Image scale reveal
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: imgRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-40 bg-[var(--warm-cream)] overflow-hidden"
    >
      {/* Background decorative text */}
      <div
        className="absolute -top-12 left-0 select-none pointer-events-none"
        style={{
          fontSize: "clamp(8rem, 18vw, 20rem)",
          fontFamily: "var(--font-playfair)",
          fontWeight: 900,
          color: "var(--light-beige)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        25
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <div className="relative">
            <div
              ref={imgRef}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/images/outdoor.jpg"
                alt="25co outdoor space"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating accent card */}
            <div
              className="absolute -bottom-8 -right-4 md:-right-8 bg-[var(--warm-brown)] text-white p-6 md:p-8 max-w-[200px]"
              style={{ boxShadow: "8px 8px 0px var(--dark-espresso)" }}
            >
              <div
                className="text-4xl font-serif mb-1"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
              >
                25
              </div>
              <div
                className="text-xs tracking-widest uppercase opacity-80 font-sans"
                style={{ letterSpacing: "0.15em", fontSize: "0.6rem" }}
              >
                Coffee & Co
              </div>
              <div className="mt-3 w-8 h-px bg-white/60" />
              <div className="mt-3 text-xs leading-relaxed opacity-80 font-sans">
                Keprabon, Solo
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div ref={textRef} className="lg:pl-8">
            <div className="reveal-text">
              <span
                className="text-xs tracking-widest uppercase text-[var(--warm-brown)] font-sans"
                style={{ letterSpacing: "0.25em", fontSize: "0.65rem" }}
              >
                Our Story
              </span>
            </div>

            <div
              ref={lineRef}
              className="mt-4 h-px bg-[var(--warm-brown)] mb-8"
              style={{ width: "60px" }}
            />

            <h2
              className="reveal-text leading-tight mb-8"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                fontWeight: 400,
                color: "var(--dark-espresso)",
                lineHeight: 1.15,
              }}
            >
              Lebih dari Sekadar{" "}
              <em style={{ color: "var(--warm-brown)", fontStyle: "italic" }}>
                Tempat Kopi
              </em>
            </h2>

            <p
              className="reveal-text text-[var(--charcoal)] leading-relaxed mb-6 font-sans"
              style={{ fontSize: "1rem", opacity: 0.75, fontFamily: "var(--font-dm-sans)" }}
            >
              25co lahir dari sebuah mimpi: menciptakan ruang di mana kreativitas bertemu
              komunitas. Di jantung Kota Solo, kami menghadirkan perpaduan unik antara kafe
              premium dan coworking space yang dirancang untuk menginspirasi.
            </p>

            <p
              className="reveal-text text-[var(--charcoal)] leading-relaxed mb-10 font-sans"
              style={{ fontSize: "1rem", opacity: 0.75, fontFamily: "var(--font-dm-sans)" }}
            >
              Dengan estetika yang hangat dan modern, setiap sudut 25co dirancang dengan
              penuh perhatian — dari pilihan furnitur hingga aroma kopi yang mengisi ruangan.
              Ini bukan hanya tempat kerja, ini adalah rumah keduamu.
            </p>

            {/* Values */}
            <div className="reveal-text grid grid-cols-2 gap-6">
              {[
                { label: "Community First", desc: "Ruang yang menghubungkan orang-orang" },
                { label: "Specialty Coffee", desc: "Setiap cangkir diseduh dengan cinta" },
                { label: "Creative Space", desc: "Desain yang menginspirasi produktivitas" },
                { label: "Solo Proud", desc: "Bangga jadi bagian dari kota Solo" },
              ].map((val) => (
                <div key={val.label} className="border-t border-[var(--light-beige)] pt-4">
                  <div
                    className="text-[var(--charcoal)] font-sans font-medium mb-1"
                    style={{ fontSize: "0.8rem", fontFamily: "var(--font-dm-sans)" }}
                  >
                    {val.label}
                  </div>
                  <div
                    className="text-[var(--charcoal)] font-sans"
                    style={{ fontSize: "0.72rem", opacity: 0.6, fontFamily: "var(--font-dm-sans)" }}
                  >
                    {val.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
