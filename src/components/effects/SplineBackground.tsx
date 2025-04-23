import React, { Suspense, useCallback, useEffect, useState, lazy } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import Spline with no SSR
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineBackgroundProps {
  className?: string;
  scene?: string;
  isInteractive?: boolean;
  priority?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

interface NavigatorWithGPU extends Navigator {
  gpu?: {
    getPreferredCanvasFormat: () => string;
  };
}

interface SplineErrorEvent {
  message?: string;
  type?: string;
}

const SplineBackground: React.FC<SplineBackgroundProps> = ({
  className = '',
  scene = 'https://draft.spline.design/W1bDWCDfRA2ltRN2/scene.splinecode',
  isInteractive = true,
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Check device performance
  useEffect(() => {
    const checkPerformance = () => {
      const nav = navigator as NavigatorWithGPU;
      const isLowEndDevice = 
        navigator.hardwareConcurrency < 4 || 
        !nav.gpu || 
        window.innerWidth < 768;
      setIsLowPerformance(isLowEndDevice);
    };

    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback((error: Error) => {
    setError(error);
    onError?.(error);
  }, [onError]);

  // Throttle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isInteractive || isLowPerformance) return;
    // Implement throttling logic here if needed
  }, [isInteractive, isLowPerformance]);

  useEffect(() => {
    if (isInteractive && !isLowPerformance) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isInteractive, isLowPerformance, handleMouseMove]);

  if (isLowPerformance) {
    return (
      <div className={`${className} bg-gradient-to-br from-gray-900 to-gray-800`} />
    );
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <AnimatePresence>
        {inView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Suspense fallback={
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 animate-pulse" />
            }>
              {error ? (
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800" />
              ) : (
                <Spline
                  scene={scene}
                  onLoad={handleLoad}
                  onError={(e: SplineErrorEvent) => handleError(new Error(e?.message || 'Unknown error'))}
                  style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: isInteractive ? 'auto' : 'none'
                  }}
                />
              )}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(SplineBackground); 