"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.fromTo(
        ".contact-content > *",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );

      // Image parallax
      const bgImg = section.querySelector(".contact-bg img");
      if (bgImg) {
        gsap.fromTo(
          bgImg,
          { yPercent: -10 },
          {
            yPercent: 10,
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
      id="contact"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: "var(--light-beige)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Map & Info */}
          <div className="contact-bg relative">
            {/* Styled location card */}
            <div
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src="/images/exterior.jpg"
                alt="25co Location"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 30%, rgba(26,16,8,0.8) 100%)",
                }}
              />
              <div className="absolute bottom-6 left-6">
                <div
                  className="text-white font-serif mb-1"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                  }}
                >
                  25co Keprabon
                </div>
                <div
                  className="text-white/70 font-sans text-sm"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Solo, Jawa Tengah
                </div>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                {
                  icon: "📍",
                  title: "Alamat",
                  detail: "Jl. Keprabon, Solo\nJawa Tengah",
                },
                {
                  icon: "🕐",
                  title: "Jam Buka",
                  detail: "Senin – Minggu\n08.00 – 22.00 WIB",
                },
                {
                  icon: "📸",
                  title: "Instagram",
                  detail: "@25co.space\n@25coffee_",
                },
                {
                  icon: "📞",
                  title: "WhatsApp",
                  detail: "Hubungi kami untuk\nbooking & reservasi",
                },
              ].map((info) => (
                <div
                  key={info.title}
                  className="bg-white p-5"
                  style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}
                >
                  <div className="text-xl mb-2">{info.icon}</div>
                  <div
                    className="text-[var(--charcoal)] font-sans font-medium mb-1"
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", letterSpacing: "0.1em" }}
                  >
                    {info.title}
                  </div>
                  <div
                    className="text-[var(--charcoal)]/60 font-sans whitespace-pre-line"
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", lineHeight: 1.6 }}
                  >
                    {info.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact form / CTA */}
          <div className="contact-content flex flex-col gap-8">
            <div>
              <span
                className="text-[var(--warm-brown)] text-xs tracking-widest uppercase font-sans block mb-4"
                style={{ letterSpacing: "0.25em", fontSize: "0.65rem" }}
              >
                Get In Touch
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  color: "var(--dark-espresso)",
                  lineHeight: 1.15,
                }}
              >
                Siap untuk{" "}
                <em style={{ color: "var(--warm-brown)", fontStyle: "italic", fontWeight: 400 }}>
                  Bergabung?
                </em>
              </h2>
              <p
                className="mt-4 text-[var(--charcoal)]/70 font-sans leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem" }}
              >
                Booking tempat, tanya-tanya menu, atau sekedar ingin tahu lebih lanjut —
                kami selalu siap menyambut kamu di 25co.
              </p>
            </div>

            {/* Simple contact form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-[var(--charcoal)] font-sans text-xs tracking-widest uppercase mb-2 block"
                    style={{ letterSpacing: "0.1em", fontSize: "0.6rem", fontFamily: "var(--font-dm-sans)" }}
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    placeholder="Nama kamu"
                    className="w-full px-4 py-3 bg-white border border-[var(--light-beige)] text-[var(--charcoal)] font-sans text-sm placeholder:text-[var(--charcoal)]/30 focus:outline-none focus:border-[var(--warm-brown)] transition-colors"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  />
                </div>
                <div>
                  <label
                    className="text-[var(--charcoal)] font-sans text-xs tracking-widest uppercase mb-2 block"
                    style={{ letterSpacing: "0.1em", fontSize: "0.6rem", fontFamily: "var(--font-dm-sans)" }}
                  >
                    Email / WA
                  </label>
                  <input
                    type="text"
                    placeholder="Email atau no. WA"
                    className="w-full px-4 py-3 bg-white border border-[var(--light-beige)] text-[var(--charcoal)] font-sans text-sm placeholder:text-[var(--charcoal)]/30 focus:outline-none focus:border-[var(--warm-brown)] transition-colors"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="text-[var(--charcoal)] font-sans text-xs tracking-widest uppercase mb-2 block"
                  style={{ letterSpacing: "0.1em", fontSize: "0.6rem", fontFamily: "var(--font-dm-sans)" }}
                >
                  Keperluan
                </label>
                <select
                  className="w-full px-4 py-3 bg-white border border-[var(--light-beige)] text-[var(--charcoal)] font-sans text-sm focus:outline-none focus:border-[var(--warm-brown)] transition-colors appearance-none"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <option value="">Pilih keperluan...</option>
                  <option value="coworking">Coworking Space</option>
                  <option value="meeting">Meeting Room</option>
                  <option value="event">Private Event</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label
                  className="text-[var(--charcoal)] font-sans text-xs tracking-widest uppercase mb-2 block"
                  style={{ letterSpacing: "0.1em", fontSize: "0.6rem", fontFamily: "var(--font-dm-sans)" }}
                >
                  Pesan
                </label>
                <textarea
                  rows={4}
                  placeholder="Cerita lebih lanjut..."
                  className="w-full px-4 py-3 bg-white border border-[var(--light-beige)] text-[var(--charcoal)] font-sans text-sm placeholder:text-[var(--charcoal)]/30 focus:outline-none focus:border-[var(--warm-brown)] transition-colors resize-none"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[var(--warm-brown)] text-white font-sans text-xs tracking-widest uppercase hover:bg-[var(--deep-brown)] transition-colors duration-300"
                style={{ letterSpacing: "0.2em", fontFamily: "var(--font-dm-sans)" }}
              >
                Kirim Pesan
              </button>
            </form>

            {/* Social links */}
            <div className="flex items-center gap-6 pt-4 border-t border-[var(--light-beige)]">
              <span
                className="text-[var(--charcoal)]/50 font-sans text-xs"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Follow us:
              </span>
              {["Instagram", "TikTok", "WhatsApp"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[var(--charcoal)]/50 hover:text-[var(--warm-brown)] font-sans text-xs transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
