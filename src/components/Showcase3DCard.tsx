import React, { useEffect, useRef, useState, memo } from 'react';
import ModelViewer from './ModelViewer';
import { usePreloadStrategy } from '../hooks/usePreloadStrategy';

interface Showcase3DCardProps {
  title: string;
  url: string;
  page: string;
  author?: string;
  isActive: boolean;
  index: number;
  totalItems: number;
  viewportPosition: { top: number; bottom: number };
  onActivate?: () => void;
}

const Showcase3DCard: React.FC<Showcase3DCardProps> = ({
  title,
  url,
  page,
  author,
  isActive,
  index,
  totalItems,
  viewportPosition
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationDelay] = useState(() => Math.random() * 0.5); // Memoized initial value
  const { shouldPreload, priority } = usePreloadStrategy(index, totalItems, viewportPosition);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        // Add root margin to start loading slightly before the element is visible
        root: null
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Memoize static calculations
  const rowIndex = Math.floor(index / 3);
  const animationVariant = React.useMemo(() => {
    const variants = [
      'translate-y-[100%] rotate-12',
      'translate-y-[100%] -rotate-12',
      'translate-y-[100%] scale-75',
      'translate-y-[100%] scale-90 rotate-6',
      'translate-y-[100%] scale-90 -rotate-6'
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        group relative aspect-[3/4] rounded-xl overflow-visible
        transform-gpu transition-all duration-1000 ease-out
        hover:z-10
        ${isVisible ? 'translate-y-0 rotate-0 scale-100 opacity-100' : `${animationVariant} opacity-0`}
      `}
      style={{
        transitionDelay: `${animationDelay + (rowIndex * 0.1)}s`,
        perspective: '1000px',
        willChange: 'transform, opacity'
      }}
    >
      {/* Enhanced ambient light effects */}
      {isVisible && (
        <>
          {/* Primary glow effect */}
          <div 
            className="absolute -inset-x-24 -inset-y-24 opacity-0 
                      group-hover:opacity-20 transition-all duration-700 pointer-events-none"
            style={{ 
              willChange: 'opacity, filter',
              background: `
                radial-gradient(
                  circle at center,
                  rgba(56, 189, 248, 0.5) 0%,
                  rgba(139, 92, 246, 0.3) 45%,
                  transparent 70%
                )
              `,
              filter: 'blur(40px)',
              transform: 'translateZ(-10px)'
            }}
          />

          {/* Secondary ambient effects */}
          <div 
            className="absolute -inset-x-16 -inset-y-16 opacity-0 
                      group-hover:opacity-30 transition-all duration-700 pointer-events-none"
            style={{ 
              willChange: 'opacity, filter',
              background: `
                radial-gradient(
                  circle at center,
                  rgba(56, 189, 248, 0.4) 0%,
                  rgba(20, 184, 166, 0.2) 50%,
                  transparent 80%
                )
              `,
              filter: 'blur(30px)',
              transform: 'translateZ(-5px)'
            }}
          />

          {/* Inner glow effect */}
          <div 
            className="absolute -inset-1 opacity-0 
                      group-hover:opacity-40 transition-all duration-700 pointer-events-none"
            style={{ 
              willChange: 'opacity, filter',
              background: `
                radial-gradient(
                  circle at center,
                  rgba(56, 189, 248, 0.3),
                  rgba(139, 92, 246, 0.2) 40%,
                  transparent 80%
                )
              `,
              filter: 'blur(20px)',
              transform: 'translateZ(0)'
            }}
          />
        </>
      )}

      <div 
        className="relative h-full transform-gpu transition-all duration-700 ease-out
                  group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-cyan-500/30
                  group-hover:[transform:rotateX(2deg)_rotateY(-5deg)]"
        style={{ willChange: 'transform' }}
      >
        {/* Card content container with enhanced blur */}
        <div 
          className="relative h-full rounded-xl overflow-hidden
                    backdrop-blur-sm bg-gray-900/50 
                    transition-all duration-500
                    group-hover:backdrop-blur-md group-hover:bg-gray-800/60"
        >
          {/* Gradient overlays with increased intensity */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <div 
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20"
            style={{ willChange: 'opacity' }}
          />

          {/* Model viewer with loading optimization */}
          {(isVisible || shouldPreload) && (
            <ModelViewer
              modelUrl={url}
              title={title}
              className="w-full h-full"
              onLoad={() => console.log(`${title} loaded`)}
              onError={(error) => console.error(`Error loading ${title}:`, error)}
              isActive={isActive}
              preload={shouldPreload}
              priority={priority}
            />
          )}

          {/* Title and author info with enhanced backdrop blur */}
          <div 
            className="absolute bottom-0 left-0 right-0 p-4 z-30
                      backdrop-blur-md bg-gray-800/30 
                      transform-gpu transition-all duration-500
                      group-hover:backdrop-blur-lg group-hover:bg-gray-800/40"
          >
            <h3 className="text-lg font-semibold text-white mb-1 
                        transition-colors group-hover:text-cyan-200">{title}</h3>
            {author && (
              <p className="text-sm text-gray-300 
                          transition-colors group-hover:text-purple-200">by {author}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Showcase3DCard);
