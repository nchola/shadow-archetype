
import React from "react";
import Showcase3DCard from "../Showcase3DCard";

const assets = [
  {
    title: "Feudal Japan: Oiran",
    url: "https://sketchfab.com/models/27be63b9f5014121a4f5021e6514c47d/embed",
    page: "https://sketchfab.com/3d-models/feudal-japan-oiran-27be63b9f5014121a4f5021e6514c47d",
  },
  {
    title: "Particle Wave",
    url: "https://sketchfab.com/models/072b42ac6b8d4c93a55f3c524e44b2f3/embed?ui_infos=0",
    page: "https://sketchfab.com/3d-models/particle-wave-072b42ac6b8d4c93a55f3c524e44b2f3",
  },
];

const AssetGridSection = () => (
  <section id="assetgrid" className="section-padding bg-shadow-primary">
    <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-12 text-center animate-fade-in">
      KOLEKSI <span className="text-shadow-accent">3D</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-center max-w-6xl mx-auto">
      {assets.map((asset, idx) => (
        <Showcase3DCard
          key={idx}
          title={asset.title}
          url={asset.url}
          page={asset.page}
        />
      ))}
    </div>
  </section>
);

export default AssetGridSection;
