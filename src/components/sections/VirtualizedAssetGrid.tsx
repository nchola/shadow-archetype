import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion, AnimatePresence } from 'framer-motion';
import { Asset } from '../../data/assets';
import Showcase3DCard from '../Showcase3DCard';

interface VirtualizedAssetGridProps {
  assets: Asset[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'featured', label: 'Featured' },
  { id: 'mystical', label: 'Mystical' },
  { id: 'classical', label: 'Classical' },
  { id: 'scientific', label: 'Scientific' },
  { id: 'modern', label: 'Modern' }
];

const VirtualizedAssetGrid: React.FC<VirtualizedAssetGridProps> = ({ assets }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(-1);
  const parentRef = useRef<HTMLDivElement>(null);

  // Filter assets based on selected category
  const filteredAssets = useMemo(() => 
    assets.filter(asset => selectedCategory === 'all' || asset.category === selectedCategory),
    [selectedCategory, assets]
  );

  // Handle category change
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveIndex(-1);
  }, []);

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex justify-center space-x-2 overflow-x-hidden pb-4">
        {CATEGORIES.map(category => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all
              ${selectedCategory === category.id 
                ? 'bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20' 
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
        <AnimatePresence mode="wait">
          {filteredAssets.map((asset, idx) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.5,
                delay: idx * 0.1
              }}
            >
              <Showcase3DCard
                {...asset}
                isActive={idx === activeIndex}
                index={idx}
                totalItems={filteredAssets.length}
                viewportPosition={{ top: 0, bottom: 0 }}
                onActivate={() => setActiveIndex(idx)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VirtualizedAssetGrid; 