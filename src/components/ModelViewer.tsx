import React, { useRef, useEffect, useCallback } from 'react';
import { useModelLoader } from '../hooks/useModelLoader';

interface SketchfabAPI {
  start: () => void;
  stop: () => void;
  addEventListener: (event: string, callback: () => void) => void;
  removeEventListener: (event: string, callback: () => void) => void;
  setUserInteraction: (enabled: boolean) => void;
  setAutoRotate: (enabled: boolean) => void;
  dispose: () => void;
}

interface SketchfabClient {
  init: (callback: (error?: Error) => void) => void;
}

interface ModelViewerProps {
  modelUrl: string;
  title: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  isActive?: boolean;
  preload?: boolean;
  priority?: number;
  isCardView?: boolean;
}

declare global {
  interface Window {
    Sketchfab: new (iframe: HTMLIFrameElement) => SketchfabClient;
  }
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelUrl,
  title,
  className = '',
  onLoad,
  onError,
  isActive = false,
  preload = false,
  priority = 0,
  isCardView = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<SketchfabAPI | null>(null);
  const { isLoading, error, setIsVisible } = useModelLoader(modelUrl, {
    preload,
    priority,
    cacheKey: `model-${modelUrl}`,
  });

  // Initialize Sketchfab API
  useEffect(() => {
    let mounted = true;

    const initAPI = () => {
      if (window.Sketchfab && iframeRef.current) {
        const client = new window.Sketchfab(iframeRef.current);
        client.init((error?: Error) => {
          if (error || !mounted) return;

          const api = client as unknown as SketchfabAPI;
          apiRef.current = api;

          // Enable all necessary features
          api.start();
          api.addEventListener('viewerready', () => {
            if (!mounted) return;
            // Make sure controls are enabled
            api.setUserInteraction(true);
            api.setAutoRotate(isActive);
          });
        });
      }
    };

    if (iframeRef.current) {
      initAPI();
    }

    return () => {
      mounted = false;
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
    };
  }, [isActive]);

  // Update autorotate when isActive changes
  useEffect(() => {
    if (apiRef.current) {
      apiRef.current.setAutoRotate(isActive);
    }
  }, [isActive]);

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

  // Construct URL with enhanced controls and API version
  const iframeUrl = `${modelUrl}${modelUrl.includes('?') ? '&' : '?'}${
    isActive ? 'autospin=1&autostart=1' : 'autospin=0&autostart=0'
  }&preload=1${
    isCardView 
      ? '&ui_controls=0&ui_infos=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_fullscreen=0&ui_annotations=0&ui_stop=0&ui_share=0&ui_inspector=0&ui_vr=0&ui_forms=0&ui_hint=0' 
      : '&ui_theme=dark&ui_controls=1&ui_infos=1&ui_watermark=0&ui_ar=1&ui_help=1&ui_settings=1&ui_fullscreen=1&ui_annotations=1&ui_stop=1&ui_share=1&ui_inspector=1&ui_vr=1&ui_forms=1&ui_hint=1'
  }&api_version=1.12.1&internal=1`;

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full transition-opacity duration-500 ${className} ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <iframe
        ref={iframeRef}
        title={title}
        src={iframeUrl}
        className="w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
        allowFullScreen
        onLoad={handleLoad}
        loading="lazy"
        style={{ background: 'transparent', pointerEvents: 'auto' }}
      />
    </div>
  );
};

export default ModelViewer; 