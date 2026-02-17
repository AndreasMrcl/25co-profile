"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const coffeeItems = [
  {
    name: "Espresso Signature",
    desc: "Single origin Arabica dari petani lokal, diseduh dengan teknik presisi.",
    price: "28K",
    img: "/images/coffee1.jpg",
    highlight: true,
  },
  {
    name: "25 Latte",
    desc: "Espresso blend kami yang khas, dipadu susu segar dengan latte art.",
    price: "35K",
    img: "/images/space1.jpg",
    highlight: false,
  },
  {
    name: "Cold Brew",
    desc: "Diseduh 18 jam, menghasilkan rasa kopi yang bold, smooth, dan refreshing.",
    price: "32K",
    img: "/images/space2.jpg",
    highlight: false,
  },
];

export default function CoffeeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Background parallax
      if (bgRef.current) {
        const img = bgRef.current.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -15 },
            {
              yPercent: 15,
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
      }

      // Content reveal
      const items = section.querySelectorAll(".coffee-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          }
        );
      });

      // Big text parallax
      const bigText = section.querySelector(".big-text-parallax");
      if (bigText) {
        gsap.fromTo(
          bigText,
          { xPercent: 0 },
          {
            xPercent: -15,
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="coffee"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: "var(--light-beige)" }}
    >
      {/* Huge background text */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none">
        <div
          className="big-text-parallax whitespace-nowrap"
          style={{
            fontSize: "clamp(8rem, 20vw, 22rem)",
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            color: "transparent",
            WebkitTextStroke: "1px rgba(184,134,92,0.12)",
            lineHeight: 1,
          }}
        >
          COFFEE COFFEE COFFEE
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="text-[var(--warm-brown)] text-xs tracking-widest uppercase font-sans block mb-4"
            style={{ letterSpacing: "0.25em", fontSize: "0.65rem" }}
          >
            The Menu
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
            Kopi Kami,{" "}
            <em style={{ color: "var(--warm-brown)", fontStyle: "italic", fontWeight: 400 }}>
              Cerita Kita
            </em>
          </h2>
        </div>

        {/* Featured Image + Items */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left: Big feature image */}
          <div className="lg:col-span-2 relative">
            <div
              ref={bgRef}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/images/merch.jpg"
                alt="25co Coffee"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,16,8,0.5) 0%, transparent 60%)",
                }}
              />
            </div>
            {/* Floating text */}
            <div className="absolute bottom-6 left-6 right-6">
              <p
                className="text-white font-serif italic"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.4rem",
                  lineHeight: 1.3,
                  fontStyle: "italic",
                }}
              >
                "Be You Bravely"
              </p>
            </div>
          </div>

          {/* Right: Coffee menu items */}
          <div className="lg:col-span-3 flex flex-col gap-0">
            {coffeeItems.map((item, i) => (
              <div
                key={item.name}
                className={`coffee-item group relative flex items-center gap-6 py-8 border-b cursor-pointer transition-all duration-300 hover:pl-4 ${
                  i === 0 ? "border-t" : ""
                }`}
                style={{ borderColor: "rgba(184,134,92,0.2)" }}
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="80px"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="text-[var(--dark-espresso)] group-hover:text-[var(--warm-brown)] transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="text-[var(--warm-brown)] font-sans font-medium ml-4"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.95rem",
                      }}
                    >
                      Rp {item.price}
                    </span>
                  </div>
                  <p
                    className="text-[var(--charcoal)]/60 font-sans text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[var(--warm-brown)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}

            <div className="pt-10">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-3 text-[var(--dark-espresso)] font-sans group"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", letterSpacing: "0.15em" }}
              >
                <span className="uppercase tracking-widest">Lihat Menu Lengkap</span>
                <div className="h-px w-8 bg-[var(--warm-brown)] group-hover:w-16 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
