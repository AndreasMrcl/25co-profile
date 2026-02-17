"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursor, {
        x: mouseX - 6,
        y: mouseY - 6,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: mouseX - 20,
        y: mouseY - 20,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 2.5, opacity: 0.5, duration: 0.3 });
      gsap.to(follower, { scale: 0.5, opacity: 0, duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block cursor fixed w-3 h-3 rounded-full pointer-events-none z-[99999]"
        style={{ backgroundColor: "var(--warm-brown)", top: 0, left: 0 }}
      />
      <div
        ref={followerRef}
        className="hidden md:block cursor-follower fixed w-10 h-10 rounded-full pointer-events-none z-[99998]"
        style={{
          border: "1px solid var(--warm-brown)",
          opacity: 0.6,
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}
