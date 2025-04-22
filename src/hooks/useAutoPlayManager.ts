import { useState, useEffect, useCallback } from 'react';

export const useAutoPlayManager = (totalModels: number, interval: number = 6000) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const nextModel = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalModels);
  }, [totalModels]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isAutoPlaying) {
      timer = setInterval(nextModel, interval);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoPlaying, interval, nextModel]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  const setActiveModel = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return {
    activeIndex,
    isAutoPlaying,
    toggleAutoPlay,
    setActiveModel,
  };
}; 