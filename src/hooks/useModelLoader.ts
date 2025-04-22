import { useState, useEffect, useCallback } from 'react';

interface ModelLoaderOptions {
  preload?: boolean;
  cacheKey?: string;
  priority?: number;
}

// Create a queue for managing preload requests
const preloadQueue: { url: string; priority: number }[] = [];
const MAX_CONCURRENT_PRELOADS = 2;
let activePreloads = 0;

const processPreloadQueue = async () => {
  if (activePreloads >= MAX_CONCURRENT_PRELOADS || preloadQueue.length === 0) return;

  // Sort queue by priority
  preloadQueue.sort((a, b) => b.priority - a.priority);

  while (activePreloads < MAX_CONCURRENT_PRELOADS && preloadQueue.length > 0) {
    const nextItem = preloadQueue.shift();
    if (!nextItem) break;

    activePreloads++;
    try {
      await fetch(nextItem.url);
    } catch (error) {
      console.warn(`Failed to preload: ${nextItem.url}`, error);
    }
    activePreloads--;
    
    // Continue processing queue
    processPreloadQueue();
  }
};

export const useModelLoader = (modelUrl: string, options: ModelLoaderOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadModel = useCallback(async () => {
    try {
      if (options.cacheKey) {
        const cached = sessionStorage.getItem(options.cacheKey);
        if (cached) {
          setIsLoading(false);
          setHasLoaded(true);
          return;
        }
      }

      // Add to preload queue if preload is enabled
      if (options.preload && !hasLoaded) {
        preloadQueue.push({
          url: modelUrl,
          priority: options.priority || 0
        });
        processPreloadQueue();
      }

      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load model'));
      setIsLoading(false);
    }
  }, [modelUrl, options.cacheKey, options.preload, options.priority, hasLoaded]);

  useEffect(() => {
    if (isVisible) {
      loadModel();
    }
  }, [isVisible, loadModel]);

  return { isLoading: isLoading && !hasLoaded, error, setIsVisible };
}; 