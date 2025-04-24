import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion, AnimatePresence } from 'framer-motion';
import { Asset } from '../../data/assets';
import Showcase3DCard from '../Showcase3DCard';
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

// Cache untuk menyimpan hasil filter per kategori
const categoryCache = new Map<string, Asset[]>();

const VirtualizedAssetGrid: React.FC<VirtualizedAssetGridProps> = ({ assets }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  // Preload assets untuk kategori yang sering diakses
  useEffect(() => {
    // Preload kategori "all" saat komponen mount
    if (!categoryCache.has('all')) {
      categoryCache.set('all', assets);
    }

    // Preload kategori lain di background
    const preloadCategories = async () => {
      for (const category of CATEGORIES) {
        if (category.id !== 'all' && !categoryCache.has(category.id)) {
          const filtered = assets.filter(asset => asset.category === category.id);
          categoryCache.set(category.id, filtered);
        }
      }
    };
    preloadCategories();

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [assets]);

  // Optimized filtering dengan cache
  const filteredAssets = useMemo(() => {
    if (categoryCache.has(selectedCategory)) {
      return categoryCache.get(selectedCategory)!;
    }
    
    const filtered = assets.filter(asset => 
      selectedCategory === 'all' || asset.category === selectedCategory
    );
    categoryCache.set(selectedCategory, filtered);
    return filtered;
  }, [selectedCategory, assets]);

  // Handle category change dengan transisi yang lebih smooth
  const handleCategoryChange = useCallback((categoryId: string) => {
    setIsTransitioning(true);
    
    // Clear timeout jika ada
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Set timeout untuk mengatur state
    transitionTimeoutRef.current = setTimeout(() => {
    setSelectedCategory(categoryId);
      setIsTransitioning(false);
    }, 100); // Small delay untuk memastikan animasi exit selesai
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
          {/* Enhanced overlay to hide watermark */}
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
              ${isTransitioning ? 'opacity-50 pointer-events-none' : ''}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTransitioning}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Grid Layout dengan optimasi rendering */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 relative z-10">
        <AnimatePresence mode="wait">
          {!isTransitioning && filteredAssets.map((asset, idx) => (
            <motion.div
              key={`${asset.title}-${selectedCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                delay: idx * 0.05
              }}
            >
              <Showcase3DCard
                {...asset}
                isActive={false}
                index={idx}
                totalItems={filteredAssets.length}
                viewportPosition={{ top: 0, bottom: 0 }}
                onActivate={() => {}}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VirtualizedAssetGrid; 