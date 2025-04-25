import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Asset } from '../../data/assets';
import Showcase3DCard from '../Showcase3DCard';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

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

const ITEMS_PER_PAGE = 6; // Menampilkan 6 item per load

// Cache untuk menyimpan hasil filter per kategori
const categoryCache = new Map<string, Asset[]>();

// Definisikan variants untuk animasi
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  show: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

const VirtualizedAssetGrid: React.FC<VirtualizedAssetGridProps> = ({ assets }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [page, setPage] = useState(1);
  const [loadedAssets, setLoadedAssets] = useState<Asset[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  // Optimized filtering dengan cache
  const filteredAssets = useMemo(() => {
    if (categoryCache.has(selectedCategory)) {
      return categoryCache.get(selectedCategory)!;
    }
    
    const filtered = selectedCategory === 'all' 
      ? assets
      : assets.filter(asset => asset.category === selectedCategory);
    
    categoryCache.set(selectedCategory, filtered);
    return filtered;
  }, [selectedCategory, assets]);

  // Load more handler
  const loadMoreAssets = useCallback(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newAssets = filteredAssets.slice(startIndex, endIndex);
    
    setLoadedAssets(prev => [...prev, ...newAssets]);
    setHasMore(endIndex < filteredAssets.length);
  }, [page, filteredAssets]);

  // Initialize first load
  useEffect(() => {
    setLoadedAssets([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory]);

  // Load more when page changes
  useEffect(() => {
    loadMoreAssets();
  }, [page, loadMoreAssets]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isTransitioning) {
          setPage(prev => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isTransitioning]);

  // Enhanced category change handler
  const handleCategoryChange = useCallback((categoryId: string) => {
    if (categoryId === selectedCategory) return;

    setIsTransitioning(true);
    
    // Animate current items out
    setLoadedAssets(prev => prev.map(asset => ({ ...asset, isExiting: true })));

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Smooth category switch
    transitionTimeoutRef.current = setTimeout(() => {
    setSelectedCategory(categoryId);
      setPage(1);
      setLoadedAssets([]);
      setIsTransitioning(false);
    }, 400);
  }, [selectedCategory]);

  return (
    <div className="space-y-8 relative min-h-[calc(100vh-8rem)]">
      {/* Social Media Links */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center space-x-3 backdrop-blur-3xl bg-gray-900/30 px-4 py-2 rounded-full">
          <motion.a
            href="https://github.com/nchola"
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
          <motion.a
            href="https://www.instagram.com/nndncholaa/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400/70 hover:text-cyan-400 transition-colors"
          >
            <FaInstagram size={24} />
          </motion.a>
        </div>
      </div>

      {/* Category Tabs with enhanced animation */}
      <div className="flex justify-center space-x-2 overflow-x-hidden pb-4 relative z-10">
        <div className="flex gap-2 p-1.5 bg-gray-800/30 backdrop-blur-xl rounded-full">
        {CATEGORIES.map(category => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`
                relative px-6 py-2 rounded-full text-sm font-medium transition-all
              ${selectedCategory === category.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-200'}
                ${isTransitioning ? 'pointer-events-none' : ''}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTransitioning}
          >
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-cyan-500/20 rounded-full shadow-lg shadow-cyan-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
          </motion.button>
        ))}
        </div>
      </div>

      {/* Grid Layout dengan Progressive Loading dan Enhanced Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 relative z-10"
      >
        <AnimatePresence mode="wait">
          {!isTransitioning && loadedAssets.map((asset, idx) => (
            <motion.div
              key={`${asset.title}-${selectedCategory}-${idx}`}
              variants={itemVariants}
              className="asset-card"
              layout
            >
              <Showcase3DCard
                {...asset}
                isActive={false}
                index={idx}
                totalItems={loadedAssets.length}
                viewportPosition={{ top: 0, bottom: 0 }}
                onActivate={() => {}}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Loading Indicator */}
      {hasMore && !isTransitioning && (
        <motion.div 
          ref={loadMoreRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full h-20 flex items-center justify-center"
        >
          <div className="relative">
            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0) 70%)"
              }}
            />
      </div>
        </motion.div>
      )}
    </div>
  );
};

export default VirtualizedAssetGrid; 