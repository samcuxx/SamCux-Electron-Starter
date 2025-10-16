"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Download, Heart, Monitor, Star, Loader2, Maximize2 } from "lucide-react";
import { LocalWallpaper } from "@/types/wallhaven";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { OfflineDownloadDialog } from "@/components/ui/offline-download-dialog";

interface WallpaperModalProps {
  wallpaper: LocalWallpaper | null;
  isOpen: boolean;
  onClose: () => void;
  isDownloaded: boolean;
  onDownloadComplete: (wallpaperId: string) => void;
}

export function WallpaperModal({
  wallpaper,
  isOpen,
  onClose,
  isDownloaded,
  onDownloadComplete,
}: WallpaperModalProps) {
  // All hooks must be called before any conditional returns
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSettingWallpaper, setIsSettingWallpaper] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [localImagePath, setLocalImagePath] = useState<string | null>(null);
  const [isLoadingFull, setIsLoadingFull] = useState(false);
  const [showOfflineDialog, setShowOfflineDialog] = useState(false);
  const [fullscreenWindowId, setFullscreenWindowId] = useState<number | null>(null);

  const { isOnline } = useNetworkStatus();

  const getFilename = (id: string) => {
    return `wallpaper_${id}.jpg`;
  };

  // Check for local file when modal opens or wallpaper changes
  useEffect(() => {
    const checkLocalFile = async () => {
      if (!wallpaper || !isDownloaded || !window.electronAPI) {
        setLocalImagePath(null);
        return;
      }

      try {
        const filename = getFilename(wallpaper.id);
        const result = await window.electronAPI.checkWallpaperExists(filename);
        if (result.exists) {
          // Get the local wallpaper as base64 data URL
          const localResult = await window.electronAPI.getLocalWallpaper(
            filename
          );
          if (localResult.success && localResult.dataUrl) {
            setLocalImagePath(localResult.dataUrl);
            console.log("Loaded local wallpaper as data URL");
          } else {
            console.error("Failed to load local wallpaper:", localResult.error);
            setLocalImagePath(null);
          }
        } else {
          setLocalImagePath(null);
        }
      } catch (error) {
        console.error("Error checking local file:", error);
        setLocalImagePath(null);
      }
    };

    checkLocalFile();
  }, [wallpaper, isDownloaded]);

  // Early return after all hooks have been called
  if (!isOpen || !wallpaper) return null;

  const handleDownload = async () => {
    // Check internet connection first
    if (!isOnline) {
      setShowOfflineDialog(true);
      return;
    }

    if (!window.electronAPI) {
      // Fallback for browser environment
      const link = document.createElement("a");
      link.href = wallpaper.fullRes;
      link.download = getFilename(wallpaper.id);
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    setIsDownloading(true);
    try {
      const result = await window.electronAPI.downloadWallpaper(
        wallpaper.fullRes,
        getFilename(wallpaper.id)
      );

      if (result.success) {
        // Show success notification
        console.log("Download completed:", result.path);
        console.log("Wallpaper saved to Wallpapers folder");
        // Set local image path using base64 data URL
        const filename = getFilename(wallpaper.id);
        const localResult = await window.electronAPI.getLocalWallpaper(
          filename
        );
        if (localResult.success && localResult.dataUrl) {
          setLocalImagePath(localResult.dataUrl);
        }
        onDownloadComplete(wallpaper.id);
      } else {
        console.error("Download failed:", result.error);
      }
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSetWallpaper = async () => {
    if (!window.electronAPI) {
      // Fallback to download in browser environment
      handleDownload();
      return;
    }

    setIsSettingWallpaper(true);
    try {
      // For local wallpapers, use the path and filename directly
      const filename =
        wallpaper.source === "local"
          ? (wallpaper as any).filename
          : getFilename(wallpaper.id);
      const url =
        wallpaper.source === "local"
          ? (wallpaper as any).path
          : wallpaper.fullRes;

      const result = await window.electronAPI.setWallpaper(url, filename);

      if (result.success) {
        console.log("Wallpaper set successfully:", result.path);
        console.log(
          "Wallpaper saved to Wallpapers folder and set as desktop background"
        );
        // Set local image path using base64 data URL if it was downloaded
        if (!localImagePath && result.path) {
          const filename = getFilename(wallpaper.id);
          const localResult = await window.electronAPI.getLocalWallpaper(
            filename
          );
          if (localResult.success && localResult.dataUrl) {
            setLocalImagePath(localResult.dataUrl);
          }
          onDownloadComplete(wallpaper.id);
        }
        onClose(); // Close modal on success
      } else {
        console.error("Failed to set wallpaper:", result.error);
      }
    } catch (error) {
      console.error("Set wallpaper error:", error);
    } finally {
      setIsSettingWallpaper(false);
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    console.log("Favorited:", wallpaper.id);
  };

  const handleFullscreen = async () => {
    if (!window.electronAPI) {
      // Fallback for browser environment - open in new tab
      window.open(displayImageSrc, '_blank');
      return;
    }

    console.log('Opening fullscreen preview with URL:', displayImageSrc ? displayImageSrc.substring(0, 100) + '...' : 'null');
    console.log('Using local image:', isUsingLocalImage);

    try {
      const result = await window.electronAPI.createFullscreenPreview(
        displayImageSrc,
        wallpaper.id
      );

      if (result.success && result.windowId) {
        setFullscreenWindowId(result.windowId);
        console.log("Fullscreen preview opened with window ID:", result.windowId);
      } else {
        console.error("Failed to open fullscreen preview:", result.error);
      }
    } catch (error) {
      console.error("Fullscreen preview error:", error);
    }
  };

  // Use local image if available, otherwise use online version
  const displayImageSrc = localImagePath || wallpaper.fullRes;
  const isUsingLocalImage = !!localImagePath;

  // Update the loadLocalWallpaper function to use cached thumbnails
  const loadLocalWallpaper = async (filename: string) => {
    if (!window.electronAPI) return null;

    try {
      setIsLoadingFull(true);

      // First try to get the full resolution image
      const result = await window.electronAPI.getLocalWallpaper(filename);

      if (result.success && result.dataUrl) {
        return result.dataUrl;
      }

      // If full resolution fails, try to get the thumbnail as fallback
      const thumbnailResult =
        await window.electronAPI.getLocalWallpaperThumbnail(filename);

      if (thumbnailResult.success && thumbnailResult.thumbnailUrl) {
        return thumbnailResult.thumbnailUrl;
      }

      return null;
    } catch (error) {
      console.error("Error loading local wallpaper:", error);
      return null;
    } finally {
      setIsLoadingFull(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-6xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
          onClick={onClose}
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* High Quality Image */}
        <div className="relative">
          <img
            src={displayImageSrc}
            alt={`Wallpaper ${wallpaper.id}`}
            className="w-full h-[80vh] object-contain bg-black cursor-pointer hover:opacity-95 transition-opacity"
            loading="lazy"
            onClick={handleFullscreen}
            title="Click to view fullscreen"
          />

          {/* Fullscreen Button Overlay */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-16 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
            onClick={handleFullscreen}
            title="View fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </Button>

          {/* Local File Indicator */}
          {isUsingLocalImage && (
            <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Local File</span>
            </div>
          )}

          {/* Bottom Overlay with Info and Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
            <div className="flex items-end justify-between">
              {/* Wallpaper Info */}
              <div className="text-white">
                <div className="flex items-center space-x-4 text-sm opacity-90 mb-2">
                  <span>{wallpaper.resolution}</span>
                  <span>•</span>
                  <span>{wallpaper.size}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span>{wallpaper.rating}</span>
                  </div>
                  {wallpaper.views && (
                    <>
                      <span>•</span>
                      <span>{wallpaper.views.toLocaleString()} views</span>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-white/60">
                    ID: {wallpaper.id}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-xs text-white/60">
                    by {wallpaper.author}
                  </span>
                  {wallpaper.source && (
                    <>
                      <span className="text-white/40">•</span>
                      <span className="text-xs text-white/60 capitalize">
                        {wallpaper.source}
                      </span>
                    </>
                  )}
                  {isDownloaded && (
                    <>
                      <span className="text-white/40">•</span>
                      <span className="text-xs text-green-400">Downloaded</span>
                    </>
                  )}
                </div>
                {wallpaper.tags && wallpaper.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {wallpaper.tags.slice(0, 8).map((tag, index) => {
                      // Handle both string tags and object tags for backward compatibility
                      const tagText =
                        typeof tag === "string"
                          ? tag
                          : (tag as any)?.name || (tag as any)?.alias || "tag";
                      return (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-white/20 rounded-full text-white/80"
                        >
                          {tagText}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {/* <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleFavorite}
                  className={`bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 ${
                    isFavorited ? "bg-red-500/50 hover:bg-red-500/70" : ""
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${
                      isFavorited ? "fill-current" : ""
                    }`}
                  />
                  {isFavorited ? "Favorited" : "Favorite"}
                </Button> */}

                {/* Fullscreen Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleFullscreen}
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  Fullscreen
                </Button>

                {/* Only show download button if not already downloaded */}
                {!isDownloaded && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {isDownloading ? "Downloading..." : "Download"}
                  </Button>
                )}

                <Button
                  size="sm"
                  onClick={handleSetWallpaper}
                  disabled={isSettingWallpaper}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white disabled:opacity-50"
                >
                  {isSettingWallpaper ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Monitor className="w-4 h-4 mr-2" />
                  )}
                  {isSettingWallpaper ? "Setting..." : "Set as Wallpaper"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offline Download Dialog */}
      <OfflineDownloadDialog
        isOpen={showOfflineDialog}
        onClose={() => setShowOfflineDialog(false)}
        contentType="wallpaper"
      />
    </div>
  );
}
