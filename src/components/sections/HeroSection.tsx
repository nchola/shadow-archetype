import React, { useEffect, useRef, useState } from "react";

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    url?: string;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spline-viewer': HTMLElement;
  }
}

const SplineViewer = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .sketchfab-embed-wrapper iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
      /* Hide ALL Sketchfab UI elements */
      iframe[src*="sketchfab.com"] {
        --sf-ui-theme: dark;
      }
      /* Custom positioning container */
      .model-container {
        position: relative;
        height: 100%;
        transform: scale(1.1);
        transform-origin: center center;
      }
      /* Additional performance optimizations */
      .sketchfab-embed-wrapper {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
        will-change: transform;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="model-container">
      <div className="sketchfab-embed-wrapper w-full h-full">
        <iframe
          title="Angel"
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/17d22525b4124088a8827d9c45a2627f/embed?autospin=1&autostart=1&preload=1&ui_theme=dark&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_watermark=0&ui_hint=0&ui_controls=0&ui_loading=0&ui_title=0&transparent=1&dnt=1&camera=0&scrollwheel=0&orbit=0,0.8,-1.5&zoom=0.8"
        />
      </div>
    </div>
  );
};

const TypewriterText = ({ text, delay = 50, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return <span>{displayText}</span>;
};

const HeroSection = () => {
  const [showFirstLine, setShowFirstLine] = useState(true);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showThirdLine, setShowThirdLine] = useState(false);

  return (
    <section className="min-h-screen bg-black relative overflow-hidden flex flex-col md:flex-row items-center">
      {/* Unified gradient system container */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        {/* Base gradient for entire section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        
        {/* Desktop side gradient */}
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute inset-y-0 left-1/2 right-0" 
               style={{
                 background: `linear-gradient(to right,
                   rgba(0,0,0,0) 0%,
                   rgba(0,0,0,0.6) 20%,
                   rgba(0,0,0,0.8) 40%,
                   rgba(0,0,0,0.95) 60%,
                   rgb(0,0,0) 100%)`
               }}
          />
        </div>

        {/* Enhanced bottom transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/95 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        </div>
      </div>

      {/* 3D Model Section */}
      <div className="w-full md:w-1/2 h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <div className="w-full h-full md:scale-110 transition-transform duration-1000">
            <SplineViewer />
          </div>
        </div>
      </div>

      {/* Text Content Section */}
      <div className="w-full md:w-1/2 h-screen relative z-10 flex items-center">
        <div className="absolute inset-0 hidden md:block bg-black" />
        
        <div className="relative z-10 px-6 md:pl-16 md:pr-8">
          <div className="space-y-4">
            <h1 className="font-orbitron text-2xl md:text-4xl font-bold text-white tracking-wider leading-snug">
              {showFirstLine && (
                <div className="mb-1.5 md:mb-3">
                  <TypewriterText 
                    text="EXPLORING THE DEPTHS OF" 
                    onComplete={() => setShowSecondLine(true)}
                  />
                </div>
              )}
              {showSecondLine && (
                <div className="mb-1.5 md:mb-3">
                  <TypewriterText 
                    text="SHADOW ARCHETYPE"
                    onComplete={() => setShowThirdLine(true)}
                  />
                </div>
              )}
              {showThirdLine && (
                <div className="leading-normal">
                  <TypewriterText 
                    text="THROUGH IMMERSIVE 3D EXPERIENCES AND VISUAL STORYTELLING"
                  />
                </div>
              )}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
