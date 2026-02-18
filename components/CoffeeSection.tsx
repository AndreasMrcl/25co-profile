"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const F = {
  playfair: '"Playfair Display", Georgia, serif',
  cormorant: '"Cormorant Garamond", Georgia, serif',
  dm: '"DM Sans", system-ui, sans-serif',
};
const items = [
  {
    name: "Espresso Signature",
    desc: "Single origin Arabica dari petani lokal, diseduh dengan teknik presisi.",
    price: "28K",
    img: "/images/latte.jpg",
  },
  {
    name: "25 Latte",
    desc: "Espresso blend kami yang khas, dipadu susu segar dengan latte art.",
    price: "35K",
    img: "/images/americano.jpg",
  },
  {
    name: "Cold Brew",
    desc: "Diseduh 18 jam, menghasilkan rasa kopi yang bold, smooth, dan refreshing.",
    price: "32K",
    img: "/images/cold-brew.jpg",
  },
];

export default function CoffeeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      if (bgTextRef.current)
        gsap.fromTo(
          bgTextRef.current,
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
          },
        );
      gsap.fromTo(
        ".cf-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cf-header", start: "top 85%" },
        },
      );
      section.querySelectorAll(".menu-item").forEach((el, i) =>
        gsap.fromTo(
          el,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          },
        ),
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="coffee"
      style={{
        padding: "120px 0",
        background: "var(--light-beige)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={bgTextRef}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          fontFamily: F.playfair,
          fontSize: "clamp(8rem, 20vw, 22rem)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1px rgba(184,134,92,0.12)",
          whiteSpace: "nowrap",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        COFFEE COFFEE COFFEE
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        <div
          className="cf-header"
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
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
            The Menu
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
            Kopi Kami,{" "}
            <em
              style={{
                color: "var(--warm-brown)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Cerita Kita
            </em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/merch.jpg"
              alt="25co Coffee"
              fill
              className="object-cover"
              sizes="40vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(26,16,8,0.65) 0%, transparent 55%)",
              }}
            />
            <p
              style={{
                position: "absolute",
                bottom: "24px",
                left: "24px",
                right: "24px",
                zIndex: 1,
                fontFamily: F.cormorant,
                fontSize: "1.35rem",
                fontStyle: "italic",
                color: "white",
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              "Be You Bravely"
            </p>
          </div>

          <div>
            {items.map((item, i) => (
              <div
                key={item.name}
                className="menu-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "24px 0",
                  borderBottom: "1px solid rgba(184,134,92,0.2)",
                  borderTop:
                    i === 0 ? "1px solid rgba(184,134,92,0.2)" : "none",
                  cursor: "pointer",
                  transition: "padding-left 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = "12px";
                  const arr = e.currentTarget.querySelector(
                    ".menu-arrow",
                  ) as HTMLElement;
                  if (arr) arr.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = "0";
                  const arr = e.currentTarget.querySelector(
                    ".menu-arrow",
                  ) as HTMLElement;
                  if (arr) arr.style.opacity = "0";
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    flexShrink: 0,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="72px"
                    style={{ transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "6px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: F.playfair,
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "var(--dark-espresso)",
                        margin: 0,
                      }}
                    >
                      {item.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: F.dm,
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "var(--warm-brown)",
                        marginLeft: "12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Rp {item.price}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: F.dm,
                      fontSize: "0.78rem",
                      color: "rgba(45,35,24,0.55)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div
                  className="menu-arrow"
                  style={{
                    color: "var(--warm-brown)",
                    opacity: 0,
                    flexShrink: 0,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
          </div>
        </div>
      </div>
    </section>
  );
}
