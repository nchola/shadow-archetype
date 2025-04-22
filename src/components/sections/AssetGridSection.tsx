
import React from "react";

const assets = [
  {
    title: "Tilt Brush - Ronin",
    author: "Joshua Eiten",
    url: "https://sketchfab.com/models/cac025847c6344899c5c18af270d0cb5/embed",
    page: "https://sketchfab.com/3d-models/tilt-brush-ronin-cac025847c6344899c5c18af270d0cb5",
    authorUrl: "https://sketchfab.com/joshuu"
  },
  {
    title: "The Shadow",
    author: "SuicideSheepArt",
    url: "https://sketchfab.com/models/6d483da57ec643ae84e45525ecb906d1/embed",
    page: "https://sketchfab.com/3d-models/the-shadow-6d483da57ec643ae84e45525ecb906d1",
    authorUrl: "https://sketchfab.com/suicidesheepart"
  },
  {
    title: "Shadow Face",
    author: "konester",
    url: "https://sketchfab.com/models/0f694c94b2b8461ab9db6aa4ac88e126/embed",
    page: "https://sketchfab.com/3d-models/shadow-face-0f694c94b2b8461ab9db6aa4ac88e126",
    authorUrl: "https://sketchfab.com/konester"
  },
  // Tambah asset koleksi lain di sini...
];

const AssetGridSection = () => (
  <section id="assetgrid" className="section-padding bg-shadow-primary">
    <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-12 text-center">
      KOLEKSI <span className="text-shadow-accent">3D</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {assets.map((asset, idx) => (
        <div
          key={idx}
          className="glass-panel p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
        >
          <div className="w-full aspect-video overflow-hidden rounded-lg border border-shadow-accent/20 bg-shadow-secondary">
            <iframe
              title={asset.title}
              src={asset.url}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              className="w-full h-full min-h-[230px] max-h-[320px] rounded-lg"
              data-mozallowfullscreen="true"
              data-webkitallowfullscreen="true"
              data-xr-spatial-tracking=""
              data-execution-while-out-of-viewport=""
              data-execution-while-not-rendered=""
              data-web-share=""
            ></iframe>
          </div>
          <div className="mt-3 text-center text-xs text-shadow-text-muted">
            <a
              href={asset.page}
              target="_blank"
              rel="nofollow"
              className="text-shadow-accent font-bold underline"
            >
              {asset.title}
            </a>{" "}
            by{" "}
            <a
              href={asset.authorUrl}
              target="_blank"
              rel="nofollow"
              className="font-bold underline"
            >
              {asset.author}
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default AssetGridSection;
