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

    // Center both elements on their own midpoint
    // so GSAP's x/y corresponds to the exact mouse position
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const onMove = (e: MouseEvent) => {
      // Dot snaps almost instantly
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
      // Ring follows with a smooth lag
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.28, ease: "power2.out" });
    };

    // When hovering interactive elements: dot expands, ring shrinks out
    const onEnter = () => {
      gsap.to(dot, { scale: 2.5, opacity: 0.4, duration: 0.25, ease: "power2.out" });
      gsap.to(ring, { scale: 0.5, opacity: 0, duration: 0.25, ease: "power2.out" });
    };

    // Restore to normal
    const onLeave = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.to(ring, { scale: 1, opacity: 0.55, duration: 0.25, ease: "power2.out" });
    };

    // Hide cursor when it leaves the window
    const onLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onEnterWindow = () => {
      gsap.to(dot, { opacity: 1, duration: 0.2 });
      gsap.to(ring, { opacity: 0.55, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);

    // Attach hover listeners to all interactive elements
    const els = document.querySelectorAll("a, button, [role='button'], select, label");
    els.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}