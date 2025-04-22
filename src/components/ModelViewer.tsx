import React, { useRef, useEffect } from 'react';
import { useModelLoader } from '../hooks/useModelLoader';

interface ModelViewerProps {
  modelUrl: string;
  title: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  isActive?: boolean;
  preload?: boolean;
  priority?: number;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelUrl,
  title,
  className = '',
  onLoad,
  onError,
  isActive = false,
  preload = false,
  priority = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading, error, setIsVisible } = useModelLoader(modelUrl, {
    preload,
    priority,
    cacheKey: `model-${modelUrl}`,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [setIsVisible]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  // Construct URL with autoplay parameters only if the model is active
  const iframeUrl = `${modelUrl}${modelUrl.includes('?') ? '&' : '?'}${
    isActive ? 'autospin=1&autostart=1' : 'autospin=0&autostart=0'
  }&preload=1&ui_controls=0&ui_infos=0`;

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full transition-opacity duration-500 ${className} ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <iframe
        title={title}
        src={iframeUrl}
        className="w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        onLoad={handleLoad}
        loading="lazy"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default ModelViewer; 