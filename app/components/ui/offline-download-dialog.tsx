"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WifiOff, Download, AlertTriangle } from "lucide-react";

interface OfflineDownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contentType?: "wallpaper" | "skin";
}

export function OfflineDownloadDialog({
  isOpen,
  onClose,
  contentType = "wallpaper",
}: OfflineDownloadDialogProps) {
  const isWallpaper = contentType === "wallpaper";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <WifiOff className="w-5 h-5" />
            No Internet Connection
          </DialogTitle>
          <DialogDescription>
            {isWallpaper
              ? "Internet connection is required to download wallpapers."
              : "Internet connection is required to download Rainmeter skins."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-1">
                Download Unavailable
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                {isWallpaper ? (
                  <>
                    Fresh wallpapers need to be downloaded from online sources.
                    Please check your internet connection and try again.
                  </>
                ) : (
                  <>
                    Rainmeter skins need to be downloaded from online
                    repositories. Please check your internet connection and try
                    again.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-500" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Tip:</strong>{" "}
                {isWallpaper
                  ? "Your previously downloaded wallpapers are available offline in the Downloads page."
                  : "Your installed Rainmeter skins will continue to work offline."}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Understood
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
