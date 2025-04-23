import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion, AnimatePresence } from 'framer-motion';
import { Asset } from '../../data/assets';
import Showcase3DCard from '../Showcase3DCard';
import SplineBackground from '../effects/SplineBackground';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
  const autoPlayInterval = useRef<NodeJS.Timeout>();

  // Filter assets based on selected category
  const filteredAssets = useMemo(() => 
    assets.filter(asset => selectedCategory === 'all' || asset.category === selectedCategory),
    [selectedCategory, assets]
  );

  // Auto-play functionality
  useEffect(() => {
    if (filteredAssets.length > 0) {
      autoPlayInterval.current = setInterval(() => {
        setActiveIndex(prev => {
          const nextIndex = (prev + 1) % filteredAssets.length;
          return nextIndex;
        });
      }, 14000); // 12 seconds interval
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [filteredAssets.length]);

  // Handle category change
  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveIndex(-1);
  }, []);

  // Handle card activation
  const handleCardActivate = useCallback((index: number) => {
    setActiveIndex(prev => prev === index ? -1 : index);
  }, []);

  return (
    <div className="space-y-8 relative min-h-[calc(100vh-8rem)]">
      {/* Social Media Links Overlay */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center space-x-3 backdrop-blur-3xl bg-gray-900/30 px-4 py-2 rounded-full">
          <motion.a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400/70 hover:text-cyan-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub size={24} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/mhmmdnanda/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400/70 hover:text-cyan-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin size={24} />
          </motion.a>
        </div>
      </div>

      {/* Spline Background with enhanced styling */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl" style={{ height: '100%' }}>
        <div className="relative w-full h-full bg-opacity-70">
          <SplineBackground 
            className="w-full h-full opacity-70"
            isInteractive={activeIndex !== -1}
            priority={activeIndex !== -1}
          />
          {/* Enhanced overlay to hide watermark */}
          <div className="absolute bottom-0 right-0 w-48 h-24 bg-gradient-radial from-gray-900/95 via-gray-900/90 to-transparent backdrop-blur-[32px] z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent z-10" />
        </div>
      </div>

      {/* Category Tabs with enhanced blur */}
      <div className="flex justify-center space-x-2 overflow-x-hidden pb-4 relative z-10">
        {CATEGORIES.map(category => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-lg
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 relative z-10">
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
                onActivate={() => handleCardActivate(idx)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VirtualizedAssetGrid; 