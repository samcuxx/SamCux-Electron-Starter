"use client";

import React, { memo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Trash2 } from "lucide-react";
import { OptimizedThumbnail } from "@/components/ui/optimized-thumbnail";
import { ExtendedLocalWallpaper } from "@/types/wallpaper";

export const WallpaperCard = memo<{
  wallpaper: ExtendedLocalWallpaper;
  onWallpaperClick?: (wallpaper: ExtendedLocalWallpaper) => void;
  onSetWallpaper?: (
    wallpaper: ExtendedLocalWallpaper,
    e: React.MouseEvent
  ) => void;
  onDeleteWallpaper?: (wallpaper: ExtendedLocalWallpaper) => void;
  isVisible?: boolean;
}>(
  ({
    wallpaper,
    onWallpaperClick,
    onSetWallpaper,
    onDeleteWallpaper,
    isVisible = true,
  }) => {
    const handleClick = useCallback(() => {
      onWallpaperClick?.(wallpaper);
    }, [onWallpaperClick, wallpaper]);

    const handleSetWallpaper = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onSetWallpaper?.(wallpaper, e);
      },
      [onSetWallpaper, wallpaper]
    );

    const handleDeleteWallpaper = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onDeleteWallpaper?.(wallpaper);
      },
      [onDeleteWallpaper, wallpaper]
    );

    return (
      <Card
        className="border-0 overflow-hidden bg-white/90 dark:bg-gray-900/90 hover:shadow-lg transition-all duration-300 group"
        onClick={handleClick}
      >
        <div className="relative">
          {/* Use OptimizedThumbnail instead of direct image */}
          <OptimizedThumbnail
            wallpaper={wallpaper}
            className="aspect-[3/2] rounded-t-xl cursor-pointer"
            alt={wallpaper.title}
            onClick={handleClick}
            isVisible={isVisible}
          />

          {/* Action buttons */}
          <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
              onClick={handleSetWallpaper}
              title="Set as wallpaper"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            {onDeleteWallpaper && (
              <Button
                size="icon"
                variant="destructive"
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-red-500 dark:bg-gray-800/80"
                onClick={handleDeleteWallpaper}
                title="Delete wallpaper"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="p-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm truncate">
              {wallpaper.title || wallpaper.filename}
            </h3>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {wallpaper.resolution || "Unknown"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {wallpaper.size || "Unknown"}
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

WallpaperCard.displayName = "WallpaperCard";
