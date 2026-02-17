"use client";
import Image from "next/image";

const F = { playfair: '"Playfair Display", Georgia, serif', dm: '"DM Sans", system-ui, sans-serif' };

export default function Footer() {
  return (
    <footer style={{ position: "relative", paddingTop: "80px", paddingBottom: "40px", background: "var(--dark-espresso)", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, fontFamily: F.playfair, fontSize: "clamp(6rem, 15vw, 16rem)", fontWeight: 900, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.04)", lineHeight: 0.85, paddingLeft: "16px", pointerEvents: "none", userSelect: "none" }}>25co</div>

      <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "60px" }}>
          <div>
            <Image src="/images/logowhite.png" alt="25co" width={52} height={52} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            <p style={{ fontFamily: F.dm, fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.72, marginTop: "20px" }}>Coffee & Coworking Space di jantung Kota Solo. Tempat di mana kreativitas bertemu komunitas.</p>
          </div>
          {[
            { title: "Navigate", links: ["About", "Space", "Coffee", "Gallery", "Contact"] },
            { title: "Social", links: ["@25co.space", "@25coffee_", "@25co (TikTok)", "WhatsApp Us"] },
          ].map(col => (
            <div key={col.title}>
              <span style={{ display: "block", fontFamily: F.dm, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "white", marginBottom: "20px" }}>{col.title}</span>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map(l => (
                  <li key={l}><a href="#" style={{ fontFamily: F.dm, fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--muted-tan)")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <span style={{ display: "block", fontFamily: F.dm, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "white", marginBottom: "20px" }}>Hours</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontFamily: F.dm, fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>Senin – Jumat</span>
              <span style={{ fontFamily: F.dm, fontSize: "0.88rem", fontWeight: 500, color: "var(--muted-tan)", marginBottom: "10px" }}>08.00 – 22.00</span>
              <span style={{ fontFamily: F.dm, fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>Sabtu – Minggu</span>
              <span style={{ fontFamily: F.dm, fontSize: "0.88rem", fontWeight: 500, color: "var(--muted-tan)" }}>08.00 – 23.00</span>
            </div>
          </div>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "28px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontFamily: F.dm, fontSize: "0.68rem", color: "rgba(255,255,255,0.2)" }}>© 2024 25co Coffee & Coworking. All rights reserved.</span>
          <span style={{ fontFamily: F.dm, fontSize: "0.68rem", color: "rgba(255,255,255,0.2)" }}>Jl. Keprabon, Kota Solo, Jawa Tengah 🇮🇩</span>
        </div>
      </div>
    </footer>
  );
}
