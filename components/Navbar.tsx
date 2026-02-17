"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const F = { playfair: '"Playfair Display", Georgia, serif', dm: '"DM Sans", system-ui, sans-serif' };
const navLinks = [{ label: "About", href: "#about" }, { label: "Space", href: "#space" }, { label: "Coffee", href: "#coffee" }, { label: "Gallery", href: "#gallery" }, { label: "Contact", href: "#contact" }];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: scrolled ? "12px 48px" : "20px 48px",
          background: scrolled ? "rgba(250,246,238,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 30px rgba(0,0,0,0.06)" : "none",
          transition: "all 0.4s ease" }}>
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <Image src="/images/logo25co.png" alt="25co" width={48} height={48} style={{ objectFit: "contain", display: "block" }} />
        </a>

        <ul style={{ display: "flex", gap: "36px", listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} onClick={e => scrollTo(e, link.href)} className="nav-link"
                style={{ fontFamily: F.dm, color: "var(--charcoal)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", transition: "color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--warm-brown)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--charcoal)")}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" onClick={e => scrollTo(e, "#contact")}
          style={{ fontFamily: F.dm, padding: "10px 22px", border: "1px solid var(--warm-brown)", color: "var(--warm-brown)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--warm-brown)"; e.currentTarget.style.color = "white"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--warm-brown)"; }}>
          Book a Space
        </a>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "var(--warm-cream)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px" }}>
            {navLinks.map((link, i) => (
              <motion.a key={link.label} href={link.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} onClick={e => scrollTo(e, link.href)}
                style={{ fontFamily: F.playfair, fontSize: "clamp(2rem, 5vw, 2.8rem)", color: "var(--charcoal)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--warm-brown)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--charcoal)")}>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
