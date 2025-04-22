
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
        "relative bg-shadow-secondary/60 glass-panel overflow-hidden border border-shadow-accent/25 transition-all duration-500 rounded-2xl shadow-lg group flex flex-col items-center justify-center",
        "hover:shadow-2xl hover:border-shadow-accent/60 hover:scale-[1.035] hover:bg-shadow-secondary/80"
      )}
      style={{ minHeight: 340, maxWidth: 460, margin: "auto" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Loading Skeleton */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-shadow-primary/40 animate-pulse">
          <div className="w-3/4 h-28 rounded-xl bg-shadow-secondary/40 mb-3" />
          <div className="w-2/5 h-4 rounded bg-shadow-accent/30" />
        </div>
      )}

      {/* 3D Embed */}
      <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden relative">
        <iframe
          title={title}
          src={url}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          className={cn("w-full h-full border-0 rounded-2xl transition-opacity", loading ? "opacity-0" : "opacity-100")}
          onLoad={() => setLoading(false)}
        />
        {/* Optional overlay: button muncul saat hover */}
        <a
          href={page}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100",
            "transition-opacity"
          )}
        >
          <Button
            size="sm"
            variant="secondary"
            className="backdrop-blur bg-shadow-primary/40 border border-shadow-accent/40 hover:bg-shadow-primary/70 text-shadow-text font-medium shadow-md"
          >
            View on Sketchfab
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Showcase3DCard;

