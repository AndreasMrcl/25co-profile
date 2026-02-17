"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.28, ease: "power2.out" });
    };
    const onEnter = () => { gsap.to(dot, { scale: 2.5, opacity: 0.4, duration: 0.25 }); gsap.to(ring, { scale: 0.5, opacity: 0, duration: 0.25 }); };
    const onLeave = () => { gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25 }); gsap.to(ring, { scale: 1, opacity: 0.55, duration: 0.25 }); };

    window.addEventListener("mousemove", onMove);
    const els = document.querySelectorAll("a, button");
    els.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    return () => {
      window.removeEventListener("mousemove", onMove);
      els.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
