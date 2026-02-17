"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const F = { playfair: '"Playfair Display", Georgia, serif', dm: '"DM Sans", system-ui, sans-serif' };
const inp: React.CSSProperties = { width: "100%", padding: "12px 16px", background: "white", border: "1px solid var(--light-beige)", color: "var(--charcoal)", fontSize: "0.88rem", fontFamily: '"DM Sans", sans-serif', outline: "none", transition: "border-color 0.3s", display: "block" };

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      section.querySelectorAll(".ct-reveal").forEach((el, i) => gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: i * 0.15, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } }));
      const img = section.querySelector(".ct-img img");
      if (img) gsap.fromTo(img, { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 } });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" style={{ padding: "120px 0", background: "var(--light-beige)", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
        <div className="ct-reveal">
          <div className="ct-img" style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", marginBottom: "16px" }}>
            <Image src="/images/exterior.jpg" alt="25co Location" fill className="object-cover" sizes="50vw" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(26,16,8,0.82) 100%)" }} />
            <div style={{ position: "absolute", bottom: "20px", left: "20px", zIndex: 1 }}>
              <div style={{ fontFamily: F.playfair, fontSize: "1.4rem", fontWeight: 600, color: "white" }}>25co Keprabon</div>
              <div style={{ fontFamily: F.dm, fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", marginTop: "2px" }}>Solo, Jawa Tengah</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[{ icon: "📍", title: "Alamat", detail: "Jl. Keprabon, Solo\nJawa Tengah" }, { icon: "🕐", title: "Jam Buka", detail: "Senin – Minggu\n08.00 – 22.00 WIB" }, { icon: "📸", title: "Instagram", detail: "@25co.space\n@25coffee_" }, { icon: "📞", title: "WhatsApp", detail: "Hubungi kami untuk\nbooking & reservasi" }].map(info => (
              <div key={info.title} style={{ background: "white", padding: "20px", boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "1.25rem", marginBottom: "8px" }}>{info.icon}</div>
                <div style={{ fontFamily: F.dm, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", fontWeight: 500, marginBottom: "4px" }}>{info.title}</div>
                <div style={{ fontFamily: F.dm, fontSize: "0.7rem", color: "rgba(45,35,24,0.55)", lineHeight: 1.65, whiteSpace: "pre-line" }}>{info.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="ct-reveal">
          <span style={{ display: "block", fontFamily: F.dm, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--warm-brown)", marginBottom: "16px" }}>Get In Touch</span>
          <h2 style={{ fontFamily: F.playfair, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "var(--dark-espresso)", lineHeight: 1.15, marginBottom: "16px", marginTop: 0 }}>
            Siap untuk <em style={{ color: "var(--warm-brown)", fontStyle: "italic", fontWeight: 400 }}>Bergabung?</em>
          </h2>
          <p style={{ fontFamily: F.dm, fontSize: "0.9rem", color: "rgba(45,35,24,0.7)", lineHeight: 1.7, marginBottom: "28px" }}>Booking tempat, tanya-tanya menu, atau sekedar ingin tahu lebih lanjut — kami selalu siap.</p>

          <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {["Nama", "Email / WA"].map(label => (
                <div key={label}>
                  <label style={{ display: "block", fontFamily: F.dm, fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", marginBottom: "8px" }}>{label}</label>
                  <input type="text" placeholder={label} style={inp} onFocus={e => (e.currentTarget.style.borderColor = "var(--warm-brown)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--light-beige)")} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ display: "block", fontFamily: F.dm, fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", marginBottom: "8px" }}>Keperluan</label>
              <select style={{ ...inp, appearance: "none", cursor: "pointer" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--warm-brown)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--light-beige)")}>
                <option>Pilih keperluan...</option>
                <option>Coworking Space</option>
                <option>Meeting Room</option>
                <option>Private Event</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontFamily: F.dm, fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", marginBottom: "8px" }}>Pesan</label>
              <textarea rows={4} placeholder="Cerita lebih lanjut..." style={{ ...inp, resize: "none" }} onFocus={e => (e.currentTarget.style.borderColor = "var(--warm-brown)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--light-beige)")} />
            </div>
            <button type="submit" style={{ fontFamily: F.dm, width: "100%", padding: "15px", background: "var(--warm-brown)", color: "white", border: "none", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--deep-brown)")} onMouseLeave={e => (e.currentTarget.style.background = "var(--warm-brown)")}>
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
