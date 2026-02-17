"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const F = { playfair: '"Playfair Display", Georgia, serif', cormorant: '"Cormorant Garamond", Georgia, serif', dm: '"DM Sans", system-ui, sans-serif' };

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      if (imgRef.current) {
        const img = imgRef.current.querySelector("img");
        if (img) gsap.fromTo(img, { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: imgRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
        gsap.fromTo(imgRef.current, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: imgRef.current, start: "top 80%" } });
      }
      if (lineRef.current) gsap.fromTo(lineRef.current, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: lineRef.current, start: "top 85%" } });
      section.querySelectorAll(".reveal-text").forEach(el => gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" style={{ position: "relative", padding: "120px 0", background: "var(--warm-cream)", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", top: "-60px", left: "-10px", fontFamily: F.playfair, fontSize: "clamp(8rem, 18vw, 20rem)", fontWeight: 900, color: "var(--light-beige)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>25</div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div ref={imgRef} style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
            <Image src="/images/outdoor.jpg" alt="25co outdoor" fill className="object-cover" sizes="50vw" />
          </div>
          <div style={{ position: "absolute", bottom: "-28px", right: "-24px", background: "var(--warm-brown)", color: "white", padding: "24px 28px", boxShadow: "8px 8px 0 var(--dark-espresso)", zIndex: 2 }}>
            <span style={{ display: "block", fontFamily: F.playfair, fontSize: "2.4rem", fontWeight: 700 }}>25</span>
            <span style={{ display: "block", fontFamily: F.dm, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.8, marginTop: "2px" }}>Coffee &amp; Co</span>
            <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.5)", margin: "12px 0" }} />
            <span style={{ fontFamily: F.dm, fontSize: "0.75rem", opacity: 0.75 }}>Keprabon, Solo</span>
          </div>
        </div>

        <div>
          <span className="reveal-text" style={{ display: "block", fontFamily: F.dm, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--warm-brown)", marginBottom: "16px" }}>Our Story</span>
          <div ref={lineRef} style={{ width: "48px", height: "1px", background: "var(--warm-brown)", marginBottom: "28px" }} />
          <h2 className="reveal-text" style={{ fontFamily: F.playfair, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 400, color: "var(--dark-espresso)", lineHeight: 1.15, marginBottom: "28px", marginTop: 0 }}>
            Lebih dari Sekadar <em style={{ color: "var(--warm-brown)", fontStyle: "italic" }}>Tempat Kopi</em>
          </h2>
          <p className="reveal-text" style={{ fontFamily: F.dm, fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(45,35,24,0.72)", marginBottom: "18px" }}>
            25co lahir dari sebuah mimpi: menciptakan ruang di mana kreativitas bertemu komunitas. Di jantung Kota Solo, kami menghadirkan perpaduan unik antara kafe premium dan coworking space yang dirancang untuk menginspirasi.
          </p>
          <p className="reveal-text" style={{ fontFamily: F.dm, fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(45,35,24,0.72)", marginBottom: "18px" }}>
            Dengan estetika yang hangat dan modern, setiap sudut 25co dirancang dengan penuh perhatian — dari pilihan furnitur hingga aroma kopi. Ini bukan hanya tempat kerja, ini adalah rumah keduamu.
          </p>
          <div className="reveal-text" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "32px" }}>
            {[{ name: "Community First", desc: "Ruang yang menghubungkan orang-orang" }, { name: "Specialty Coffee", desc: "Setiap cangkir diseduh dengan cinta" }, { name: "Creative Space", desc: "Desain yang menginspirasi produktivitas" }, { name: "Solo Proud", desc: "Bangga jadi bagian dari kota Solo" }].map(v => (
              <div key={v.name} style={{ borderTop: "1px solid var(--light-beige)", paddingTop: "16px" }}>
                <div style={{ fontFamily: F.dm, fontSize: "0.78rem", fontWeight: 500, color: "var(--charcoal)", marginBottom: "4px" }}>{v.name}</div>
                <div style={{ fontFamily: F.dm, fontSize: "0.7rem", color: "rgba(45,35,24,0.5)" }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
