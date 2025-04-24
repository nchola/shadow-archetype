import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import ModelViewer from './ModelViewer';
import { usePreloadStrategy } from '../hooks/usePreloadStrategy';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaCompress } from 'react-icons/fa';

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
  viewportPosition,
  onActivate
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCardViewOnly, setIsCardViewOnly] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [animationDelay] = useState(() => Math.random() * 0.5);
  const { shouldPreload, priority } = usePreloadStrategy(index, totalItems, viewportPosition);

  // Handle modal close with cleanup
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    // Reset any active states
    if (onActivate && isActive) {
      onActivate();
    }
  }, [onActivate, isActive]);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal, handleCloseModal]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showModal, handleCloseModal]);

  // Handle Sketchfab messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'VIEWER_STOP' || 
          event.data?.type === 'VIEWER_CLOSE') {
        handleCloseModal();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleCloseModal]);

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

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    // Check if click is on view toggle button
    const target = e.target as HTMLElement;
    if (target.closest('.view-toggle-btn')) {
      return; // Let the toggle button handle the click
    }

    // If not in card-view-only mode, open modal
    if (!isCardViewOnly) {
      if (onActivate) {
        onActivate();
      }
      setShowModal(true);
    }
  }, [onActivate, isCardViewOnly]);

  const toggleViewMode = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCardViewOnly(!isCardViewOnly);
  }, [isCardViewOnly]);

  return (
    <>
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
        onClick={handleCardClick}
      >
        <div 
          className="relative h-full transform-gpu transition-all duration-700 ease-out
                    group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-cyan-500/30
                    group-hover:[transform:rotateX(2deg)_rotateY(-5deg)]"
          style={{ willChange: 'transform' }}
        >
          <div 
            className="relative h-full rounded-xl overflow-hidden
                      backdrop-blur-sm bg-gray-900/90 
                      transition-all duration-500
                      group-hover:backdrop-blur-md group-hover:bg-gray-800/90"
          >
            {/* Enhanced background layers */}
            <div className="absolute inset-0 bg-gray-900/95 z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />
            <div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20"
              style={{ willChange: 'opacity' }}
            />

            {/* Loading placeholder */}
            {!isModelLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              </div>
            )}

            {/* View mode toggle button */}
            <button
              onClick={toggleViewMode}
              className="view-toggle-btn absolute top-4 right-4 z-40 p-2 rounded-full
                       bg-gray-800/90 backdrop-blur-sm
                       text-white hover:text-cyan-300 transition-colors
                       hover:bg-gray-700/90"
            >
              {isCardViewOnly ? <FaCompress size={16} /> : <FaExpand size={16} />}
            </button>

            {/* Model viewer with loading state */}
            {(isVisible || shouldPreload) && (
              <div className="relative w-full h-full">
                <ModelViewer
                  modelUrl={url}
                  title={title}
                  className={`w-full h-full transition-opacity duration-500 ${
                    isModelLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => {
                    console.log(`${title} loaded`);
                    setIsModelLoaded(true);
                  }}
                  onError={(error) => {
                    console.error(`Error loading ${title}:`, error);
                    setIsModelLoaded(true); // Still show the card even if there's an error
                  }}
                  isActive={isActive || isCardViewOnly}
                  preload={shouldPreload}
                  priority={priority}
                  isCardView={!isCardViewOnly}
                />
              </div>
            )}

            {/* Title and author info */}
            <div 
              className="absolute bottom-0 left-0 right-0 p-4 z-40
                        backdrop-blur-md bg-gray-800/90 
                        transform-gpu transition-all duration-500
                        group-hover:backdrop-blur-lg group-hover:bg-gray-800/95"
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

      {/* Modal View with dark theme */}
      <AnimatePresence mode="wait">
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-gray-900/95 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0">
                <ModelViewer
                  modelUrl={url}
                  title={title}
                  className="w-full h-full"
                  isActive={true}
                  preload={true}
                  priority={1}
                  isCardView={false}
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                {author && <p className="text-gray-300 mb-3">by {author}</p>}
                <a
                  href={page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-cyan-600 text-white rounded-lg
                           hover:bg-cyan-500 transition-colors"
                >
                  View on Sketchfab
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Showcase3DCard);
