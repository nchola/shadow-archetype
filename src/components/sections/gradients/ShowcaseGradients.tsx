import React from 'react';

export const TransitionBreak: React.FC = () => (
  <div className="w-full h-40 relative">
    {/* Primary gradient layer */}
    <div className="absolute inset-0"
      style={{
        background: `
          linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.98) 15%,
            rgba(0, 0, 0, 0.95) 30%,
            rgba(0, 0, 0, 0.92) 45%,
            rgba(0, 0, 0, 0.85) 60%,
            rgba(0, 0, 0, 0.75) 75%,
            rgba(0, 0, 0, 0.6) 90%,
            transparent 100%
          )
        `
      }}
    />

    {/* Color transition layers */}
    <div className="absolute inset-0"
      style={{
        background: `
          radial-gradient(120% 120% at 50% 0%, rgba(56, 189, 248, 0.03) 0%, transparent 50%),
          radial-gradient(120% 120% at 50% 100%, rgba(20, 184, 166, 0.03) 0%, transparent 50%),
          radial-gradient(120% 120% at 0% 50%, rgba(139, 92, 246, 0.02) 0%, transparent 50%),
          radial-gradient(120% 120% at 100% 50%, rgba(139, 92, 246, 0.02) 0%, transparent 50%)
        `
      }}
    />

    {/* Smooth blend layer */}
    <div className="absolute inset-0 opacity-20"
      style={{
        background: `
          linear-gradient(180deg,
            rgba(56, 189, 248, 0.02) 0%,
            rgba(139, 92, 246, 0.015) 50%,
            rgba(20, 184, 166, 0.02) 100%
          )
        `
      }}
    />

    {/* Fine grain texture */}
    <div className="absolute inset-0 mix-blend-overlay opacity-10"
      style={{
        background: `
          repeating-linear-gradient(
            45deg,
            rgba(56, 189, 248, 0.001) 0px,
            rgba(139, 92, 246, 0.001) 1px,
            rgba(20, 184, 166, 0.001) 2px
          )
        `
      }}
    />
  </div>
);

export const TopBlendGradient: React.FC = () => (
  <div className="absolute inset-x-0 top-0 h-40 z-10"
    style={{
      background: `
        linear-gradient(to bottom,
          rgba(0, 0, 0, 0.6) 0%,
          rgba(0, 0, 0, 0.4) 40%,
          rgba(0, 0, 0, 0.2) 70%,
          transparent 100%
        ),
        radial-gradient(100% 100% at 50% 0%, rgba(56, 189, 248, 0.02) 0%, transparent 70%)
      `
    }}
  />
); 