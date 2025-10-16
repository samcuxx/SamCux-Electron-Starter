import React from "react";
import { RainmeterSkin } from "@/types/rainmeter";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Settings, Package, X } from "lucide-react";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { OfflineDownloadDialog } from "@/components/ui/offline-download-dialog";

interface SkinModalProps {
  skin: RainmeterSkin | null;
  isOpen: boolean;
  onClose: () => void;
  isInstalled: boolean;
  isDownloaded?: boolean;
  onDownload: (skin: RainmeterSkin) => void;
  onInstall: (skin: RainmeterSkin) => void;
  onEnable: (skin: RainmeterSkin) => void;
  onConfigure: (skin: RainmeterSkin) => void;
}

export function SkinModal({
  skin,
  isOpen,
  onClose,
  isInstalled,
  isDownloaded = false,
  onDownload,
  onInstall,
  onEnable,
  onConfigure,
}: SkinModalProps) {
  const { isOnline } = useNetworkStatus();
  const [showOfflineDialog, setShowOfflineDialog] = React.useState(false);

  if (!skin) return null;

  const formatFileSize = (sizeStr: string): string => {
    if (!sizeStr) return "Unknown";
    return sizeStr;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Preview Image */}
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
            {skin.thumbnail_url ? (
              <img
                src={skin.thumbnail_url}
                alt={skin.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FileText className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-bold line-clamp-2 flex-1">
                  {skin.name}
                </h2>
                {isInstalled && (
                  <Badge className="bg-orange-500 text-white ml-4">
                    Installed
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{skin.category}</span>
                <span>•</span>
                <span>{formatFileSize(skin.file_size)}</span>
              </div>
            </div>

            {/* Description */}
            {skin.description && (
              <div className="mb-6">
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {skin.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3">
              {isInstalled ? (
                <>
                  <Button variant="outline" onClick={() => onConfigure(skin)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </>
              ) : isDownloaded ? (
                <>
                  <Button
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0"
                    onClick={() => onInstall(skin)}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Install
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (!isOnline) {
                        setShowOfflineDialog(true);
                        return;
                      }
                      onDownload(skin);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
                    onClick={() => onInstall(skin)}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Install
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Offline Download Dialog */}
      <OfflineDownloadDialog
        isOpen={showOfflineDialog}
        onClose={() => setShowOfflineDialog(false)}
        contentType="skin"
      />
    </Dialog>
  );
}
