
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Showcase3DCardProps {
  title: string;
  url: string;
  page: string;
}

const Showcase3DCard: React.FC<Showcase3DCardProps> = ({ title, url, page }) => {
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        // Menghilangkan border, shadow dan glass-panel agar hanya 3D embed
        "relative flex flex-col items-center justify-center group transition-all duration-500 w-full",
        "rounded-3xl overflow-hidden",
        "hover:scale-[1.03]"
      )}
      style={{
        minHeight: 0,
        maxWidth: "100%",
        margin: "auto",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5 animate-pulse pointer-events-none">
          <div className="w-3/5 h-36 rounded-lg bg-shadow-secondary/10" />
        </div>
      )}

      {/* 3D Embed */}
      <div className="w-full aspect-[16/10] relative rounded-3xl overflow-hidden">
        <iframe
          title={title}
          src={url}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          className={cn(
            "w-full h-full block transition-opacity duration-300",
            loading ? "opacity-0" : "opacity-100",
          )}
          onLoad={() => setLoading(false)}
        />

        {/* Tombol "View on Sketchfab" (hanya saat hover) */}
        <a
          href={page}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "absolute bottom-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          )}
        >
          <Button
            size="sm"
            variant="secondary"
            className="backdrop-blur bg-shadow-primary/60 border-none text-shadow-text font-medium shadow-lg"
          >
            View on Sketchfab
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Showcase3DCard;
