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
    <section className="min-h-screen bg-black relative overflow-hidden flex items-center">
      {/* Brand Name */}
      <div className="absolute top-8 right-8 z-20">
        <h2 className="font-orbitron text-xl font-bold">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          <a href="#" className="text-shadow-text font-orbitron text-xl md:text-2xl font-bold">
          SHADOW<span className="text-shadow-accent">ARCHETYPE</span>
        </a>          </span>
        </h2>
      </div>

      {/* Left side - 3D Model */}
      <div className="w-1/2 h-screen relative">
        <div className="absolute inset-0">
          <ModelViewer
            modelUrl="https://sketchfab.com/models/ec07ac844bc747518759436172b6f773/embed"
            title="APOMIXIS"
            className="w-full h-full"
            isActive={true}
            preload={true}
            priority={1}
            isCardView={false}
          />
        </div>
        {/* Modify gradient overlay to not block interactions */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black opacity-90 pointer-events-none" />
      </div>

      {/* Right side - Text Content */}
      <div className="w-1/2 pl-16 pr-8 relative z-10">
        <div className="space-y-4">
          <h1 className="font-orbitron text-4xl font-bold text-white tracking-wider leading-tight">
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

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-30"
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
