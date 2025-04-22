
import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const AboutSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
            animatedElements?.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('visible');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-shadow-primary to-shadow-secondary"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-12 text-center animate-on-scroll">
          ABOUT THE <span className="text-shadow-accent">PROJECT</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-panel p-8 animate-on-scroll">
            <h3 className="text-2xl font-orbitron font-semibold mb-4 text-shadow-accent">
              The Shadow Concept
            </h3>
            <p className="text-shadow-text-muted mb-4">
              The shadow represents the aspects of ourselves that we repress, deny, or are unaware of. 
              It contains both destructive elements and untapped potential that, when integrated, 
              can lead to greater self-knowledge and personal growth.
            </p>
            <p className="text-shadow-text-muted">
              This project explores these hidden dimensions through interactive 3D models and 
              immersive experiences, allowing viewers to confront and engage with archetypal 
              shadow elements in a controlled visual environment.
            </p>
          </div>

          <div className="glass-panel p-8 animate-on-scroll">
            <h3 className="text-2xl font-orbitron font-semibold mb-4 text-shadow-accent">
              The Journey
            </h3>
            <p className="text-shadow-text-muted mb-4">
              Each 3D model in this collection represents a stage in the journey of shadow 
              integration: recognition, confrontation, acceptance, and transformation.
            </p>
            <p className="text-shadow-text-muted">
              Through interactive elements and dynamic animations, viewers can engage with the 
              psychological journey of facing one's shadow and witnessing the potential for growth 
              and transformation that lies within these hidden aspects of the self.
            </p>
          </div>

          <div className="glass-panel p-8 animate-on-scroll">
            <h3 className="text-2xl font-orbitron font-semibold mb-4 text-shadow-accent">
              Visual Language
            </h3>
            <p className="text-shadow-text-muted">
              The visual aesthetics of this project draw from depth psychology, mythology, and 
              contemporary digital art. Dark tones represent the hidden nature of the shadow, 
              while accent colors highlight moments of insight and transformation. Dynamic lighting 
              and particle effects symbolize the fluid, ever-changing nature of consciousness.
            </p>
          </div>

          <div className="glass-panel p-8 animate-on-scroll">
            <h3 className="text-2xl font-orbitron font-semibold mb-4 text-shadow-accent">
              Interactive Experience
            </h3>
            <p className="text-shadow-text-muted">
              Unlike traditional static art, this collection invites active participation. 
              Users can manipulate viewpoints, trigger animations, and witness transformations 
              based on their interactions. This interactive element mirrors the active psychological 
              work required to engage with one's shadow content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
