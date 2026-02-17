"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SpaceSection from "@/components/SpaceSection";
import CoffeeSection from "@/components/CoffeeSection";
import GallerySection from "@/components/GallerySection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function Home() {
  useEffect(() => {
    // Prevent flash of unstyled content
    document.body.style.opacity = "1";
  }, []);

  return (
    <SmoothScrollProvider>
      <NoiseOverlay />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SpaceSection />
        <CoffeeSection />
        <GallerySection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
