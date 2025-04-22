
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AssetGridSection from "@/components/sections/AssetGridSection";

const Index = () => (
  <main className="min-h-screen bg-shadow-primary text-shadow-text">
    <Navbar />
    <HeroSection />
    <AssetGridSection />
  </main>
);

export default Index;
