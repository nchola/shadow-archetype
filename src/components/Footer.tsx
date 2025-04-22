import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full py-8">
      <div className="max-w-3xl mx-auto px-4">
        <motion.p 
          className="text-gray-400 text-sm text-center leading-relaxed whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          All 3D models featured in this showcase are sourced from{' '}
          <a 
            href="https://sketchfab.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Sketchfab
          </a>
          , the leading platform for 3D and AR content
        </motion.p>
      </div>

      {/* Subtle gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
    </footer>
  );
};

export default Footer; 