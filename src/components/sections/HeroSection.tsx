
import React, { useEffect, useRef } from "react";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.classList.add("animate-fade-in");
    }
    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.classList.add("animate-fade-in");
      }
    }, 300);
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.classList.add("animate-fade-in");
      }
    }, 600);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-shadow-primary">
      {/* 3D Model as background */}
      <div className="absolute inset-0 w-full h-full model-container z-0">
        <div className="sketchfab-embed-wrapper w-full h-full flex items-center justify-center">
          <iframe 
            title="Tilt Brush - Ronin"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src="https://sketchfab.com/models/cac025847c6344899c5c18af270d0cb5/embed"
            className="w-full h-full min-h-[400px] max-h-[90vh] rounded-xl shadow-2xl border border-shadow-accent/40"
            style={{ background: "transparent" }}
            data-mozallowfullscreen="true"
            data-webkitallowfullscreen="true"
            data-xr-spatial-tracking=""
            data-execution-while-out-of-viewport=""
            data-execution-while-not-rendered=""
            data-web-share=""
          ></iframe>
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-shadow-primary/80 via-transparent to-shadow-primary/95 pointer-events-none"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-8 md:mt-0">
        <h1
          ref={titleRef}
          className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 drop-shadow-lg"
          style={{ textShadow: "0 0 10px #FF4D4D80" }}
        >
          KOLEKSI <span className="text-shadow-accent">3D</span> PRIBADI
        </h1>
        <p
          ref={subtitleRef}
          className="text-shadow-text-muted text-lg md:text-xl max-w-2xl mb-8 opacity-0"
        >
          Eksplorasi kepribadian <span className="text-shadow-accent font-bold">Shadow Archetype</span> melalui visual 3D unik. Interaktif, personal, artistik.
        </p>
        <button
          ref={buttonRef}
          className="button-primary opacity-0"
          onClick={() => document.getElementById('assetgrid')?.scrollIntoView({ behavior: 'smooth' })}
        >
          LIHAT SEMUA ASSET
        </button>
        {/* Info bawah model sesuai embed */}
        <div className="mt-6 text-xs text-shadow-text-muted bg-black/60 px-3 py-2 rounded-lg inline-block backdrop-blur-md">
          <a href="https://sketchfab.com/3d-models/tilt-brush-ronin-cac025847c6344899c5c18af270d0cb5?utm_medium=embed&utm_campaign=share-popup&utm_content=cac025847c6344899c5c18af270d0cb5" target="_blank" rel="nofollow" className="text-shadow-accent font-bold underline">
            Tilt Brush - Ronin
          </a>{" "}
          by{" "}
          <a href="https://sketchfab.com/joshuu?utm_medium=embed&utm_campaign=share-popup&utm_content=cac025847c6344899c5c18af270d0cb5" target="_blank" rel="nofollow" className="text-shadow-accent font-bold underline">
            Joshua Eiten
          </a>{" "}
          on{" "}
          <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=cac025847c6344899c5c18af270d0cb5" target="_blank" rel="nofollow" className="font-bold underline text-[#1CAAD9]">
            Sketchfab
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
