
import React, { useEffect, useRef } from "react";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animate elements on page load
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
    <section id="hero" className="relative h-screen overflow-hidden bg-shadow-primary">
      {/* 3D Model as background */}
      <div className="absolute inset-0 model-container">
        <div className="sketchfab-embed-wrapper">
          <iframe 
            title="Tilt Brush - Ronin" 
            frameBorder="0" 
            allowFullScreen={true}
            allow="autoplay; fullscreen; xr-spatial-tracking" 
            src="https://sketchfab.com/models/cac025847c6344899c5c18af270d0cb5/embed"
            style={{ width: '100%', height: '100%' }}
            // Custom attributes need to be added via data attributes to avoid TypeScript errors
            data-mozallowfullscreen="true"
            data-webkitallowfullscreen="true"
            data-xr-spatial-tracking=""
            data-execution-while-out-of-viewport=""
            data-execution-while-not-rendered=""
            data-web-share=""
          ></iframe>
        </div>
        {/* Overlay to control visibility and contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-shadow-primary/60 via-shadow-primary/40 to-shadow-primary/90"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center px-6">
        <h1 
          ref={titleRef}
          className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0"
          style={{ textShadow: "0 0 10px rgba(255, 77, 77, 0.5)" }}
        >
          EXPLORE THE <span className="text-shadow-accent">SHADOW</span> ARCHETYPE
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-shadow-text-muted text-lg md:text-xl max-w-2xl mb-8 opacity-0"
        >
          Immerse yourself in a journey through the hidden dimensions of consciousness. 
          Interact with 3D representations of inner conflict and self-discovery.
        </p>
        
        <button 
          ref={buttonRef}
          className="button-primary opacity-0"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          BEGIN JOURNEY
        </button>
      </div>

      {/* Down arrow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-shadow-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
