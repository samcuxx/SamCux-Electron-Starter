"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExtendedLocalWallpaper } from "@/types/wallpaper";

// Global cache for thumbnails to prevent repeated IPC calls
// This is shared across all instances of OptimizedThumbnail
import { LRUCache } from "lru-cache";

// More efficient thumbnail cache with LRU eviction policy
export const thumbnailCache = new LRUCache<string, string>({
  max: 100, // Maximum number of items to store in cache
  ttl: 1000 * 60 * 15, // Time to live: 15 minutes
  allowStale: false, // Don't serve stale items
  updateAgeOnGet: true, // Reset TTL when item is accessed
  updateAgeOnHas: false,
});

// Track failed thumbnails to avoid repeated requests
export const failedThumbnails = new Set<string>();

// Optimized thumbnail component with lazy loading and caching
export const OptimizedThumbnail = memo<{
  wallpaper: ExtendedLocalWallpaper;
  className?: string;
  alt: string;
  onClick?: () => void;
  isVisible?: boolean;
}>(({ wallpaper, className, alt, onClick, isVisible = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" } // Increased root margin for better preloading
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  // Load thumbnail only when intersecting
  useEffect(() => {
    if (!isIntersecting || !window.electronAPI) {
      if (!window.electronAPI) {
        setError(true);
        setIsLoading(false);
      }
      return;
    }

    const loadThumbnail = async () => {
      // Check cache first
      const cacheKey = wallpaper.filename;

      if (failedThumbnails.has(cacheKey)) {
        setError(true);
        setIsLoading(false);
        return;
      }

      const cachedThumbnail = thumbnailCache.get(cacheKey);
      if (cachedThumbnail) {
        setThumbnailSrc(cachedThumbnail);
        setIsLoading(false);
        return;
      }

      try {
        const result = await window.electronAPI.getLocalWallpaperThumbnail(
          wallpaper.filename
        );

        if (result.success && result.thumbnailUrl) {
          thumbnailCache.set(cacheKey, result.thumbnailUrl);
          setThumbnailSrc(result.thumbnailUrl);
        } else {
          console.warn(
            `Failed to load thumbnail for: ${wallpaper.filename}`,
            result.error
          );
          failedThumbnails.add(cacheKey);
          setError(true);
        }
      } catch (err) {
        console.error("Failed to load thumbnail:", err);
        failedThumbnails.add(cacheKey);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadThumbnail();
  }, [isIntersecting, wallpaper.filename]);

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}

      {error || !thumbnailSrc ? (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      ) : (
        <Image
          src={thumbnailSrc}
          alt={alt}
          width={319}
          height={180}
          className={cn("w-full h-full object-cover", className)}
          onClick={onClick}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
            failedThumbnails.add(wallpaper.filename);
          }}
          loading="lazy"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          priority={false}
        />
      )}
    </div>
  );
});

OptimizedThumbnail.displayName = "OptimizedThumbnail";
