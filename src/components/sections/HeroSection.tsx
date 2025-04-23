import React, { useEffect, useRef, useState } from "react";
import ModelViewer from '../ModelViewer';

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
      {/* 3D Model - Full width on mobile, half width on desktop */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative">
        <div className="absolute inset-0">
          <ModelViewer
            modelUrl="https://sketchfab.com/models/606b7fe570dd4ae38e59fe3acf81e8a0/embed?ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_controls=0&ui_watermark=0&ui_hint=0"
            title="Core-collapse Supernova"
            className="w-full h-full"
            isActive={true}
            preload={true}
            priority={1}
            isCardView={false}
          />
        </div>
        {/* Gradient overlay - Adjusted for mobile */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-black opacity-90 pointer-events-none" />
      </div>

      {/* Text Content - Full width on mobile, half width on desktop */}
      <div className="w-full md:w-1/2 px-6 md:pl-16 md:pr-8 relative z-10 mt-8 md:mt-0">
        <div className="space-y-4">
          <h1 className="font-orbitron text-2xl md:text-4xl font-bold text-white tracking-wider leading-tight">
            {showFirstLine && (
              <TypewriterText 
                text="EXPLORING THE DEPTHS OF" 
                onComplete={() => setShowSecondLine(true)}
              />
            )}
            {showSecondLine && (
              <div className="mt-2">
                <TypewriterText 
                  text="SHADOW ARCHETYPE"
                  onComplete={() => setShowThirdLine(true)}
                />
              </div>
            )}
            {showThirdLine && (
              <div className="mt-2">
                <TypewriterText 
                  text="THROUGH IMMERSIVE 3D EXPERIENCES AND VISUAL STORYTELLING"
                />
              </div>
            )}
          </h1>
        </div>
      </div>

      {/* Background gradients - Adjusted for mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-full md:w-1/3 h-full opacity-30"
          style={{
            background: `
              radial-gradient(circle at right, rgba(56, 189, 248, 0.15), transparent 70%),
              radial-gradient(circle at right top, rgba(139, 92, 246, 0.1), transparent 60%),
              linear-gradient(to left, rgba(20, 184, 166, 0.1), transparent)
            `
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
