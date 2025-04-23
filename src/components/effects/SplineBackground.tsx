import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../ErrorBoundary';

// Dynamic import with explicit path and type assertion
const Spline = React.lazy(() => import('@splinetool/react-spline'));

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

const FallbackBackground: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`${className} relative overflow-hidden`}>
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
    <div 
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.1), transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(20, 184, 166, 0.1), transparent 70%)
        `
      }}
    />
  </div>
);

const SplineBackground: React.FC<SplineBackgroundProps> = ({
  className = '',
  scene = '/assets/spline/scene.splinecode',
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

  // Verify scene file exists
  useEffect(() => {
    const verifyScene = async () => {
      try {
        const response = await fetch(scene);
        if (!response.ok) {
          throw new Error(`Failed to load scene file: ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/octet-stream')) {
          console.warn('Scene file might not be in the correct format:', contentType);
        }
      } catch (err) {
        console.error('Scene verification failed:', err);
        setError(err instanceof Error ? err : new Error('Failed to verify scene file'));
      }
    };

    verifyScene();
  }, [scene]);

  const handleLoad = useCallback(() => {
    console.log('Spline scene loaded successfully');
    setIsLoaded(true);
    setError(null);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback((error: Error | SplineErrorEvent) => {
    const errorMessage = error instanceof Error ? error.message : error.message || 'Failed to load Spline scene';
    console.error('Spline loading error:', errorMessage);
    setError(error instanceof Error ? error : new Error(errorMessage));
    onError?.(error instanceof Error ? error : new Error(errorMessage));
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

  if (isLowPerformance || error) {
    return <FallbackBackground className={className} />;
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
            <ErrorBoundary
              fallback={<FallbackBackground className="w-full h-full" />}
            >
              <Suspense 
                fallback={
                  <div className="w-full h-full">
                    <FallbackBackground className="w-full h-full animate-pulse" />
                  </div>
                }
              >
                <Spline
                  scene={scene}
                  onLoad={handleLoad}
                  onError={handleError}
                  style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: isInteractive ? 'auto' : 'none'
                  }}
                />
              </Suspense>
            </ErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(SplineBackground); 