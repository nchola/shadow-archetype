import { useEffect, useState } from 'react';

interface PreloadStrategy {
  shouldPreload: boolean;
  priority: number;
}

export const usePreloadStrategy = (
  index: number,
  totalItems: number,
  viewportPosition: { top: number; bottom: number }
): PreloadStrategy => {
  const [strategy, setStrategy] = useState<PreloadStrategy>({
    shouldPreload: false,
    priority: 0,
  });

  useEffect(() => {
    // Calculate how many rows we're showing (assuming 3 items per row)
    const itemsPerRow = 3;
    const currentRow = Math.floor(index / itemsPerRow);
    const totalRows = Math.ceil(totalItems / itemsPerRow);
    
    // Calculate viewport position relative to content
    const viewportProgress = (viewportPosition.top + viewportPosition.bottom) / 2;
    const currentViewportRow = Math.floor(viewportProgress / window.innerHeight);
    
    // Determine if this item is in the next 2 rows from current viewport
    const rowsAhead = currentRow - currentViewportRow;
    const isInNextTwoRows = rowsAhead > 0 && rowsAhead <= 2;
    
    // Calculate priority based on distance from viewport
    const priority = isInNextTwoRows ? (2 - rowsAhead) * 10 : 0;
    
    setStrategy({
      shouldPreload: isInNextTwoRows,
      priority,
    });
  }, [index, totalItems, viewportPosition]);

  return strategy;
}; 