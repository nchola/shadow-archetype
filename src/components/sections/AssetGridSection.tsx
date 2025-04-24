import React from 'react';
import { assets } from '../../data/assets';
import { TransitionBreak, TopBlendGradient } from './gradients/ShowcaseGradients';
import VirtualizedAssetGrid from './VirtualizedAssetGrid';
import Footer from '../Footer';

const AssetGridSection = () => {
  return (
    <>
      
      <section 
        id="assetgrid" 
        className="section-padding bg-shadow-primary relative overflow-hidden -mt-20"
      >
        <TopBlendGradient />

        <div className="max-w-7xl mx-auto relative z-10">
          <VirtualizedAssetGrid assets={assets} />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AssetGridSection;
