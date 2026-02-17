"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-10 overflow-hidden"
      style={{ background: "var(--dark-espresso)" }}
    >
      {/* Large background text */}
      <div
        className="absolute bottom-0 left-0 right-0 select-none pointer-events-none overflow-hidden"
        style={{
          fontSize: "clamp(6rem, 15vw, 16rem)",
          fontFamily: "var(--font-playfair)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          lineHeight: 0.85,
          paddingLeft: "1rem",
        }}
      >
        25co
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/images/logowhite.png"
              alt="25co Logo"
              width={60}
              height={60}
              className="object-contain mb-6"
            />
            <p
              className="text-white/40 font-sans leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem" }}
            >
              Coffee & Coworking Space di jantung Kota Solo. Tempat di mana kreativitas bertemu komunitas.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div
              className="text-white font-sans mb-6"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Navigate
            </div>
            <ul className="flex flex-col gap-3">
              {["About", "Space", "Coffee", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/40 hover:text-[var(--muted-tan)] font-sans text-sm transition-colors duration-300"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div
              className="text-white font-sans mb-6"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Social
            </div>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Instagram", handle: "@25co.space" },
                { name: "Instagram Coffee", handle: "@25coffee_" },
                { name: "TikTok", handle: "@25co" },
                { name: "WhatsApp", handle: "Chat Us" },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href="#"
                    className="text-white/40 hover:text-[var(--muted-tan)] font-sans text-sm transition-colors duration-300 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    <span className="text-white/20">—</span>
                    {social.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <div
              className="text-white font-sans mb-6"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Hours
            </div>
            <div className="flex flex-col gap-2">
              <div
                className="text-white/40 font-sans"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem" }}
              >
                Senin – Jumat
              </div>
              <div
                className="text-[var(--muted-tan)] font-sans"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", fontWeight: 500 }}
              >
                08.00 – 22.00
              </div>
              <div
                className="text-white/40 font-sans mt-2"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem" }}
              >
                Sabtu – Minggu
              </div>
              <div
                className="text-[var(--muted-tan)] font-sans"
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", fontWeight: 500 }}
              >
                08.00 – 23.00
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-white/25 font-sans"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem" }}
          >
            © 2024 25co Coffee & Coworking. All rights reserved.
          </p>
          <p
            className="text-white/25 font-sans"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem" }}
          >
            Jl. Keprabon, Kota Solo, Jawa Tengah 🇮🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
