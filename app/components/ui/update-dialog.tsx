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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Download,
  ExternalLink,
  Calendar,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

interface UpdateInfo {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  downloadUrl: string;
  releaseNotes?: string;
  publishDate?: string;
  error?: string;
}

interface UpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  updateInfo: UpdateInfo | null;
  isChecking?: boolean;
}

export function UpdateDialog({
  isOpen,
  onClose,
  updateInfo,
  isChecking = false,
}: UpdateDialogProps) {
  const handleDownload = async () => {
    try {
      if (window.updateAPI?.openDownloadPage) {
        await window.updateAPI.openDownloadPage();
      }
    } catch (error) {
      console.error("Error opening download page:", error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";

    try {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(dateString));
    } catch {
      return "Unknown";
    }
  };

  const formatReleaseNotes = (notes?: string) => {
    if (!notes || notes.trim() === "") {
      return "This update includes bug fixes, performance improvements, and new features to enhance your experience.";
    }

    // Basic markdown-like formatting for better readability
    return notes
      .replace(/^### (.+)$/gm, "$1:")
      .replace(/^## (.+)$/gm, "$1:")
      .replace(/^# (.+)$/gm, "$1:")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1");
  };

  if (isChecking) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
              Checking for Updates
            </DialogTitle>
            <DialogDescription>
              Please wait while we check for the latest version...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (!updateInfo) {
    return null;
  }

  if (updateInfo.error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Update Check Failed
            </DialogTitle>
            <DialogDescription>
              Unable to check for updates at this time.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-300">
                Error: {updateInfo.error}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (!updateInfo.hasUpdate) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-5 h-5" />
              You&apos;re Up to Date!
            </DialogTitle>
            <DialogDescription>
              You have the latest version of WinCux installed.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <span className="text-sm font-medium text-green-900 dark:text-green-100">
                Current Version:
              </span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              >
                v{updateInfo.currentVersion}
              </Badge>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-600">
            <Download className="w-5 h-5" />
            Update Available
          </DialogTitle>
          <DialogDescription>
            WinCux v{updateInfo.latestVersion} is now available.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Version Comparison */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Current
              </p>
              <Badge variant="outline">v{updateInfo.currentVersion}</Badge>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full mx-1"></div>
              <div className="w-6 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Latest
              </p>
              <Badge className="bg-blue-500 text-white">
                v{updateInfo.latestVersion}
              </Badge>
            </div>
          </div>

          {/* Release Information */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-700 dark:text-blue-300">
              {formatReleaseNotes(updateInfo.releaseNotes)}
            </div>
            {updateInfo.publishDate && (
              <div className="flex items-center gap-1 mt-2 text-xs text-blue-600 dark:text-blue-400">
                <Calendar className="w-3 h-3" />
                {formatDate(updateInfo.publishDate)}
              </div>
            )}
          </div>

          {/* Download Notice */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Opens download page in your browser
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Later
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Type declarations for window.updateAPI
declare global {
  interface Window {
    updateAPI?: {
      checkForUpdates: () => Promise<UpdateInfo>;
      openDownloadPage: () => Promise<{ success: boolean; error?: string }>;
    };
  }
}
