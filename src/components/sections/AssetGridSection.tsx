import React from "react";
import Showcase3DCard from "../Showcase3DCard";

const assets = [
  {
    title: "Tilt Brush - Ronin",
    url: "https://sketchfab.com/models/cac025847c6344899c5c18af270d0cb5/embed",
    page: "https://sketchfab.com/3d-models/tilt-brush-ronin-cac025847c6344899c5c18af270d0cb5",
  },
  {
    title: "The Shadow",
    url: "https://sketchfab.com/models/6d483da57ec643ae84e45525ecb906d1/embed",
    page: "https://sketchfab.com/3d-models/the-shadow-6d483da57ec643ae84e45525ecb906d1",
  },
  {
    title: "Shadow Face",
    url: "https://sketchfab.com/models/0f694c94b2b8461ab9db6aa4ac88e126/embed",
    page: "https://sketchfab.com/3d-models/shadow-face-0f694c94b2b8461ab9db6aa4ac88e126",
  },
  // Tambah asset koleksi lain di sini...
];

const AssetGridSection = () => (
  <section id="assetgrid" className="section-padding bg-shadow-primary">
    <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-12 text-center animate-fade-in">
      KOLEKSI <span className="text-shadow-accent">3D</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
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
