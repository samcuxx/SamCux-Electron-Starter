"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Wifi,
  WifiOff,
  AlertCircle,
  CheckCircle,
  Loader2,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";
import {
  wallpaperProvider,
  WallpaperSource,
} from "@/lib/providers/wallpaper-provider";

interface SourceStatus {
  source: WallpaperSource;
  status: "connected" | "error" | "disabled";
}

export function WallpaperSourceStatus() {
  const [sourceStatuses, setSourceStatuses] = useState<SourceStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const loadSourceStatuses = async () => {
    try {
      const statuses = await wallpaperProvider.getSourceStatus();
      setSourceStatuses(statuses);
    } catch (error) {
      console.error("Failed to load source statuses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshStatuses = async () => {
    setIsRefreshing(true);
    await loadSourceStatuses();
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadSourceStatuses();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "disabled":
        return <WifiOff className="w-4 h-4 text-gray-400" />;
      default:
        return <Wifi className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Connected";
      case "error":
        return "Error";
      case "disabled":
        return "Disabled";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "disabled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsVisible(true)}
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg"
        >
          <Settings className="w-4 h-4 mr-2" />
          Sources
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center">
              <Zap className="w-4 h-4 mr-2 text-blue-500" />
              Connection Status
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={refreshStatuses}
                disabled={isRefreshing}
                className="h-6 w-6 p-0"
              >
                <Loader2
                  className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-6 w-6 p-0"
              >
                <EyeOff className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : (
            <div className="space-y-3">
              {sourceStatuses.map((sourceStatus) => (
                <div
                  key={sourceStatus.source.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50 dark:bg-gray-800/50"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(sourceStatus.status)}
                    <div>
                      <h4 className="text-sm font-medium">
                        {sourceStatus.source.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {sourceStatus.source.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {sourceStatus.source.requiresApiKey && (
                      <Badge variant="outline" className="text-xs">
                        API
                      </Badge>
                    )}
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getStatusColor(
                        sourceStatus.status
                      )}`}
                    >
                      {getStatusText(sourceStatus.status)}
                    </Badge>
                  </div>
                </div>
              ))}

              {sourceStatuses.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    No sources configured
                  </p>
                </div>
              )}

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {
                      sourceStatuses.filter((s) => s.status === "connected")
                        .length
                    }{" "}
                    connected
                  </span>
                  <span>
                    {sourceStatuses.filter((s) => s.source.enabled).length}{" "}
                    enabled
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
