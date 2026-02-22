"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const F = { playfair: '"Playfair Display", Georgia, serif', dm: '"DM Sans", system-ui, sans-serif' };

const tickerItems = [
  "Be You Bravely",
  "Jl. Keprabon · Banjarsari · Solo",
  "08.00 – 22.00 WIB",
  "@25co.space",
  "Specialty Coffee",
  "Coworking Space",
  "Free WiFi",
  "Meeting Room",
];

export default function ContactSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgPanelRef = useRef<HTMLDivElement>(null);
  const btnRef      = useRef<HTMLButtonElement>(null);
  const t1Ref       = useRef<HTMLDivElement>(null);
  const t2Ref       = useRef<HTMLDivElement>(null);

  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const [values,  setValues]  = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const setFoc = (k: string, v: boolean) => setFocused(p => ({ ...p, [k]: v }));
  const setVal = (k: string, v: string)  => setValues(p  => ({ ...p, [k]: v  }));
  const active  = (k: string) => focused[k] || !!values[k];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* Giant "25" drifts horizontally on scroll */
      gsap.fromTo(".ct-giant", { x: "6%" }, {
        x: "-6%", ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });

      /* Photo panel clip-path open from top */
      if (imgPanelRef.current) {
        gsap.fromTo(imgPanelRef.current, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)", duration: 1.6, ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
        const img = imgPanelRef.current.querySelector("img");
        if (img)
          gsap.fromTo(img, { yPercent: -12 }, { yPercent: 10, ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
      }

      /* Section number rotate-in */
      gsap.fromTo(".ct-sec-num", { rotationZ: -90, opacity: 0 },
        { rotationZ: -90, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" } });

      /* Title words burst in */
      gsap.fromTo(".ct-word", { yPercent: 115, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: "power4.out",
        scrollTrigger: { trigger: ".ct-title-wrap", start: "top 86%" },
      });

      /* Form fields slide in from right */
      gsap.fromTo(".ct-field", { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ct-form", start: "top 88%" },
      });

      /* Info rows stagger */
      gsap.fromTo(".ct-info-row", { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ct-info-stack", start: "top 88%" },
      });

      /* Ticker 1 – forward */
      const inner1 = t1Ref.current?.querySelector<HTMLElement>(".ct-ti");
      if (inner1) { const w = inner1.scrollWidth / 2; gsap.to(inner1, { x: -w, duration: 24, ease: "none", repeat: -1 }); }

      /* Ticker 2 – reverse */
      const inner2 = t2Ref.current?.querySelector<HTMLElement>(".ct-ti2");
      if (inner2) { const w = inner2.scrollWidth / 2; gsap.fromTo(inner2, { x: -w / 2 }, { x: 0, duration: 24, ease: "none", repeat: -1 }); }

    }, section);

    /* Magnetic submit button */
    const btn = btnRef.current;
    const onMove = (e: MouseEvent) => {
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
    btn?.addEventListener("mousemove", onMove);
    btn?.addEventListener("mouseleave", onLeave);

    return () => { ctx.revert(); btn?.removeEventListener("mousemove", onMove); btn?.removeEventListener("mouseleave", onLeave); };
  }, []);

  /* Floating label input */
  const Field = ({ id, label, type = "text" }: { id: string; label: string; type?: string }) => (
    <div className="ct-field" style={{ position: "relative", paddingTop: "18px" }}>
      <label style={{
        position: "absolute", left: 0,
        top: active(id) ? 0 : "24px",
        fontFamily: F.dm, pointerEvents: "none",
        fontSize:        active(id) ? "0.48rem" : "0.85rem",
        letterSpacing:   active(id) ? "0.22em"  : "0",
        textTransform:   active(id) ? "uppercase" : "none",
        color: focused[id] ? "var(--warm-brown)" : "rgba(255,255,255,0.28)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}>{label}</label>
      <input type={type} onFocus={() => setFoc(id, true)} onBlur={() => setFoc(id, false)} onChange={e => setVal(id, e.target.value)}
        style={{ width: "100%", background: "transparent", border: "none", outline: "none", paddingBottom: "6px", paddingTop: "8px", fontFamily: F.dm, fontSize: "0.9rem", color: "white",
          borderBottom: `1px solid ${focused[id] ? "var(--warm-brown)" : "rgba(255,255,255,0.1)"}`, transition: "border-color 0.3s" }} />
    </div>
  );

  /* Ticker row */
  const Ticker = ({ cls, rev }: { cls: string; rev?: boolean }) => {
    const arr = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];
    return (
      <div style={{ overflow: "hidden", padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className={cls} style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
          {arr.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "0 32px", fontFamily: F.dm, fontSize: "0.58rem", letterSpacing: "0.24em", textTransform: "uppercase", color: rev ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.26)" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--warm-brown)", opacity: 0.55, flexShrink: 0, display: "inline-block" }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        .ct-sel {
          width: 100%; background: transparent; border: none; outline: none;
          border-bottom: 1px solid rgba(255,255,255,0.1); padding: 8px 0 6px;
          font-family: "DM Sans",sans-serif; font-size: 0.85rem;
          color: rgba(255,255,255,0.28); transition: border-color 0.3s, color 0.3s;
          appearance: none; cursor: pointer;
        }
        .ct-sel:focus { border-bottom-color: var(--warm-brown); color: white; }
        .ct-sel option { background: #2D2318; }

        .ct-ta {
          width: 100%; background: transparent; border: none; outline: none;
          border-bottom: 1px solid rgba(255,255,255,0.1); padding: 8px 0 6px;
          font-family: "DM Sans",sans-serif; font-size: 0.88rem; color: white; resize: none;
          transition: border-color 0.3s;
        }
        .ct-ta:focus { border-bottom-color: var(--warm-brown); }
        .ct-ta::placeholder { color: rgba(255,255,255,0.18); }

        .ct-info-row {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: padding-left 0.3s ease;
        }
        .ct-info-row:hover { padding-left: 6px; }
        .ct-info-row:hover .ct-ii { color: var(--warm-brown); }

        /* Diagonal cut on image panel */
        .ct-img-panel {
          clip-path: polygon(0 0, 91% 0, 100% 100%, 0 100%);
        }

        .ct-btn {
          position: relative; overflow: hidden;
          padding: 20px 60px; border: none;
          background: var(--warm-brown); color: white;
          font-family: "DM Sans",sans-serif; font-size: 0.6rem;
          letter-spacing: 0.3em; text-transform: uppercase;
          will-change: transform; transition: background 0.3s;
        }
        .ct-btn::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(120deg, rgba(255,255,255,0.14), transparent 60%);
          opacity:0; transition: opacity 0.3s;
        }
        .ct-btn:hover { background: var(--deep-brown); }
        .ct-btn:hover::before { opacity:1; }

        .ct-word-clip { overflow: hidden; display: block; }
      `}</style>

      <section ref={sectionRef} id="contact" style={{ background: "var(--charcoal)", position: "relative", overflow: "hidden" }}>

        {/* Top ticker */}
        <div ref={t1Ref}><Ticker cls="ct-ti" /></div>

        {/* ══ Main body: full-height split grid ══ */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh", position: "relative" }}>

          {/* ── LEFT: diagonal photo panel ────────────────── */}
          <div ref={imgPanelRef} className="ct-img-panel" style={{ position: "relative", minHeight: "720px", overflow: "hidden" }}>
            <Image src="/images/exterior.jpg" alt="25co" fill className="object-cover" sizes="50vw"
              style={{ objectPosition: "center", pointerEvents: "none", transform: "scale(1.15)", transformOrigin: "center" }} />

            {/* Deep layered gradient */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(26,16,8,0.08) 0%, rgba(26,16,8,0.82) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(184,134,92,0.15), transparent)" }} />

            {/* Rotated section label */}
            <div className="ct-sec-num" style={{ position: "absolute", left: "22px", top: "50%", transformOrigin: "center", transform: "translateY(-50%) rotateZ(-90deg)", fontFamily: F.dm, fontSize: "0.46rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>
              07 · Hubungi Kami
            </div>

            {/* Big title bleeding out of photo at bottom */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 44px", zIndex: 2 }}>
              <span style={{ display: "block", fontFamily: F.dm, fontSize: "0.52rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--muted-tan)", marginBottom: "18px" }}>◈ Get In Touch</span>

              <div className="ct-title-wrap" style={{ lineHeight: 0.88 }}>
                {[
                  { text: "Siap",       weight: 700, italic: false, color: "white"           },
                  { text: "untuk",      weight: 700, italic: false, color: "white"           },
                  { text: "Bergabung?", weight: 400, italic: true,  color: "var(--muted-tan)" },
                ].map((w, i) => (
                  <div key={i} className="ct-word-clip">
                    <span className="ct-word" style={{ display: "block", fontFamily: F.playfair, fontWeight: w.weight, fontStyle: w.italic ? "italic" : "normal", color: w.color, fontSize: "clamp(3.2rem, 6vw, 6.5rem)", letterSpacing: w.italic ? "0.01em" : "-0.025em" }}>
                      {w.text}
                    </span>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: F.dm, fontSize: "0.76rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.8, marginTop: "20px", maxWidth: "320px" }}>
                Booking tempat, tanya menu, atau sekadar menyapa — kami selalu ada.
              </p>
            </div>

            {/* Info stack – top right of photo */}
            <div className="ct-info-stack" style={{ position: "absolute", top: "44px", right: "56px", zIndex: 3, minWidth: "190px" }}>
              {[
                { icon: "◎", label: "Lokasi",  val: "Jl. Keprabon, Solo" },
                { icon: "◷", label: "Jam Buka", val: "08.00 – 22.00 WIB" },
                { icon: "◈", label: "Instagram", val: "@25co.space" },
              ].map(row => (
                <div key={row.label} className="ct-info-row">
                  <span className="ct-ii" style={{ fontFamily: F.playfair, fontSize: "0.95rem", color: "rgba(255,255,255,0.35)", minWidth: "16px", marginTop: "2px", transition: "color 0.3s" }}>{row.icon}</span>
                  <div>
                    <div style={{ fontFamily: F.dm, fontSize: "0.46rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "3px" }}>{row.label}</div>
                    <div style={{ fontFamily: F.dm, fontSize: "0.74rem", color: "rgba(255,255,255,0.65)" }}>{row.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: form panel ─────────────────────────── */}
          <div style={{ position: "relative", padding: "80px 72px 80px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>

            {/* Ambient glow */}
            <div style={{ position: "absolute", top: "15%", right: "-15%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(184,134,92,0.08), transparent 70%)", pointerEvents: "none", filter: "blur(70px)" }} />

            {/* Giant "25" watermark behind form */}
            <div className="ct-giant" style={{ position: "absolute", right: "-20px", bottom: "-60px", fontFamily: F.playfair, fontSize: "clamp(16rem,24vw,22rem)", fontWeight: 900, color: "transparent", WebkitTextStroke: "1px rgba(184,134,92,0.055)", lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 0 }}>
              25
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Eyebrow with line */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "52px" }}>
                <div style={{ width: "24px", height: "1px", background: "var(--warm-brown)" }} />
                <span style={{ fontFamily: F.dm, fontSize: "0.52rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted-tan)" }}>Formulir Kontak</span>
              </div>

              {submitted ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ fontFamily: F.playfair, fontSize: "5rem", color: "var(--warm-brown)", lineHeight: 1 }}>✦</div>
                  <h3 style={{ fontFamily: F.playfair, fontSize: "2.6rem", fontStyle: "italic", color: "white", margin: 0, lineHeight: 1.1 }}>Terima<br />Kasih!</h3>
                  <p style={{ fontFamily: F.dm, fontSize: "0.85rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.9, margin: 0 }}>Pesan kamu sudah kami terima.<br />Kami akan segera menghubungi kamu.</p>
                </div>
              ) : (
                <form className="ct-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
                    <Field id="nama"   label="Nama" />
                    <Field id="kontak" label="Email / WhatsApp" />
                  </div>

                  {/* Keperluan */}
                  <div className="ct-field" style={{ position: "relative", paddingTop: "18px" }}>
                    <label style={{ position: "absolute", left: 0, top: active("kep") ? 0 : "24px", fontFamily: F.dm, pointerEvents: "none", fontSize: active("kep") ? "0.48rem" : "0.85rem", letterSpacing: active("kep") ? "0.22em" : "0", textTransform: active("kep") ? "uppercase" : "none", color: focused["kep"] ? "var(--warm-brown)" : "rgba(255,255,255,0.28)", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                      Keperluan
                    </label>
                    <select className="ct-sel" onFocus={() => { setFoc("kep", true); setVal("kep", "x"); }} onBlur={e => { setFoc("kep", false); setVal("kep", e.target.value || ""); }} onChange={e => setVal("kep", e.target.value)}>
                      <option value=""></option>
                      <option>Coworking Space</option>
                      <option>Meeting Room</option>
                      <option>Private Event</option>
                      <option>Lainnya</option>
                    </select>
                  </div>

                  {/* Pesan */}
                  <div className="ct-field" style={{ position: "relative", paddingTop: "18px" }}>
                    <label style={{ position: "absolute", left: 0, top: active("msg") ? 0 : "24px", fontFamily: F.dm, pointerEvents: "none", fontSize: active("msg") ? "0.48rem" : "0.85rem", letterSpacing: active("msg") ? "0.22em" : "0", textTransform: active("msg") ? "uppercase" : "none", color: focused["msg"] ? "var(--warm-brown)" : "rgba(255,255,255,0.28)", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
                      Pesan
                    </label>
                    <textarea rows={4} className="ct-ta" onFocus={() => setFoc("msg", true)} onBlur={() => setFoc("msg", false)} onChange={e => setVal("msg", e.target.value)} style={{ paddingTop: "10px" }} />
                  </div>

                  {/* Submit */}
                  <div style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "28px" }}>
                    <button ref={btnRef} type="submit" className="ct-btn">
                      Kirim →
                    </button>
                    <div style={{ width: "1px", height: "36px", background: "rgba(255,255,255,0.08)" }} />
                    <div>
                      <div style={{ fontFamily: F.dm, fontSize: "0.46rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: "5px" }}>atau via</div>
                      <a href="https://instagram.com/25co.space" target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: F.dm, fontSize: "0.74rem", color: "var(--muted-tan)", textDecoration: "none", transition: "color 0.3s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--warm-brown)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-tan)")}>
                        @25co.space ↗
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom ticker (reverse direction) */}
        <div ref={t2Ref}><Ticker cls="ct-ti2" rev /></div>

      </section>
    </>
  );
}