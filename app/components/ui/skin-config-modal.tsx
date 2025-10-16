import React, { useState, useEffect } from "react";
import { RainmeterSkin, SkinConfiguration } from "@/types/rainmeter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Monitor,
  Layers,
  RotateCcw,
  Save,
  X,
  MousePointer,
  Eye,
  Lock,
  Unlock,
  Info,
} from "lucide-react";

interface SkinConfigModalProps {
  skin: RainmeterSkin | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (configuration: SkinConfiguration) => void;
  currentConfig?: SkinConfiguration | null;
}

const DEFAULT_CONFIG: Omit<SkinConfiguration, "skinId"> = {
  position: { x: 100, y: 100 },
  size: { width: 200, height: 200 },
  opacity: 100,
  alwaysOnTop: false,
  clickThrough: false,
  keepOnScreen: true,
  customVariables: {},
};

export function SkinConfigModal({
  skin,
  isOpen,
  onClose,
  onSave,
  currentConfig,
}: SkinConfigModalProps) {
  const [config, setConfig] = useState<SkinConfiguration>({
    skinId: skin?.id || "",
    ...DEFAULT_CONFIG,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [customVar, setCustomVar] = useState({ key: "", value: "" });

  // Initialize config when skin or currentConfig changes
  useEffect(() => {
    if (skin) {
      const initialConfig = currentConfig
        ? { ...currentConfig }
        : { skinId: skin.id, ...DEFAULT_CONFIG };

      setConfig(initialConfig);
      setHasChanges(false);
    }
  }, [skin, currentConfig]);

  // Track changes
  useEffect(() => {
    if (currentConfig) {
      const configChanged =
        JSON.stringify(config) !== JSON.stringify(currentConfig);
      setHasChanges(configChanged);
    } else {
      setHasChanges(true);
    }
  }, [config, currentConfig]);

  if (!skin) return null;

  const handleSave = () => {
    onSave(config);
    setHasChanges(false);
  };

  const handleReset = () => {
    if (currentConfig) {
      setConfig({ ...currentConfig });
    } else {
      setConfig({ skinId: skin.id, ...DEFAULT_CONFIG });
    }
    setHasChanges(false);
  };

  const handlePositionChange = (axis: "x" | "y", value: string) => {
    const numValue = parseInt(value) || 0;
    setConfig((prev) => ({
      ...prev,
      position: { ...prev.position, [axis]: numValue },
    }));
  };

  const handleSizeChange = (dimension: "width" | "height", value: string) => {
    const numValue = parseInt(value) || 0;
    setConfig((prev) => ({
      ...prev,
      size: { ...prev.size, [dimension]: numValue },
    }));
  };

  const handleOpacityChange = (value: number[]) => {
    setConfig((prev) => ({ ...prev, opacity: value[0] }));
  };

  const handleSwitchChange = (
    field: keyof SkinConfiguration,
    value: boolean
  ) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const addCustomVariable = () => {
    if (customVar.key && customVar.value) {
      setConfig((prev) => ({
        ...prev,
        customVariables: {
          ...prev.customVariables,
          [customVar.key]: customVar.value,
        },
      }));
      setCustomVar({ key: "", value: "" });
    }
  };

  const removeCustomVariable = (key: string) => {
    setConfig((prev) => {
      const newVars = { ...prev.customVariables };
      delete newVars[key];
      return { ...prev, customVariables: newVars };
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-xl font-bold line-clamp-1 mb-2">
                  Configure {skin.name}
                </DialogTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Settings className="w-4 h-4" />
                  <span>Skin Configuration</span>
                  {hasChanges && (
                    <Badge variant="secondary" className="text-xs">
                      Unsaved Changes
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <Tabs defaultValue="position" className="h-full">
              <TabsList className="grid w-full grid-cols-4 mx-6 mt-4">
                <TabsTrigger value="position">Position & Size</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
                <TabsTrigger value="variables">Variables</TabsTrigger>
              </TabsList>

              <div className="p-6 pt-4">
                <TabsContent value="position" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Monitor className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-semibold">Position & Size</h3>
                    </div>

                    {/* Position Controls */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pos-x">X Position</Label>
                        <Input
                          id="pos-x"
                          type="number"
                          value={config.position.x}
                          onChange={(e) =>
                            handlePositionChange("x", e.target.value)
                          }
                          placeholder="Horizontal position"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pos-y">Y Position</Label>
                        <Input
                          id="pos-y"
                          type="number"
                          value={config.position.y}
                          onChange={(e) =>
                            handlePositionChange("y", e.target.value)
                          }
                          placeholder="Vertical position"
                        />
                      </div>
                    </div>

                    {/* Size Controls */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          type="number"
                          value={config.size.width}
                          onChange={(e) =>
                            handleSizeChange("width", e.target.value)
                          }
                          placeholder="Width in pixels"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          type="number"
                          value={config.size.height}
                          onChange={(e) =>
                            handleSizeChange("height", e.target.value)
                          }
                          placeholder="Height in pixels"
                        />
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Position Preview</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Skin will be positioned at ({config.position.x},{" "}
                        {config.position.y}) with size {config.size.width}×
                        {config.size.height} pixels
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="appearance" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Eye className="w-5 h-5 text-purple-500" />
                      <h3 className="text-lg font-semibold">Appearance</h3>
                    </div>

                    {/* Opacity Control */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Opacity</Label>
                        <span className="text-sm text-muted-foreground">
                          {config.opacity}%
                        </span>
                      </div>
                      <Slider
                        value={[config.opacity]}
                        onValueChange={handleOpacityChange}
                        max={100}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>10% (Transparent)</span>
                        <span>100% (Opaque)</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Layer Controls */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Always on Top</Label>
                          <p className="text-sm text-muted-foreground">
                            Keep skin above all other windows
                          </p>
                        </div>
                        <Switch
                          checked={config.alwaysOnTop}
                          onCheckedChange={(value) =>
                            handleSwitchChange("alwaysOnTop", value)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Keep on Screen</Label>
                          <p className="text-sm text-muted-foreground">
                            Prevent skin from moving off-screen
                          </p>
                        </div>
                        <Switch
                          checked={config.keepOnScreen}
                          onCheckedChange={(value) =>
                            handleSwitchChange("keepOnScreen", value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="behavior" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <MousePointer className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold">Behavior</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Label>Click Through</Label>
                            {config.clickThrough ? (
                              <Unlock className="w-4 h-4 text-orange-500" />
                            ) : (
                              <Lock className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {config.clickThrough
                              ? "Mouse clicks pass through the skin"
                              : "Mouse clicks are captured by the skin"}
                          </p>
                        </div>
                        <Switch
                          checked={config.clickThrough}
                          onCheckedChange={(value) =>
                            handleSwitchChange("clickThrough", value)
                          }
                        />
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Behavior Summary</span>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>
                          • Layer:{" "}
                          {config.alwaysOnTop ? "Always on top" : "Normal"}
                        </li>
                        <li>
                          • Interaction:{" "}
                          {config.clickThrough
                            ? "Click-through"
                            : "Interactive"}
                        </li>
                        <li>
                          • Boundary:{" "}
                          {config.keepOnScreen
                            ? "Stay on screen"
                            : "Can move off-screen"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="variables" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Layers className="w-5 h-5 text-orange-500" />
                      <h3 className="text-lg font-semibold">
                        Custom Variables
                      </h3>
                    </div>

                    {/* Add Variable */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium mb-3">Add Custom Variable</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <Input
                          placeholder="Variable name"
                          value={customVar.key}
                          onChange={(e) =>
                            setCustomVar((prev) => ({
                              ...prev,
                              key: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder="Variable value"
                          value={customVar.value}
                          onChange={(e) =>
                            setCustomVar((prev) => ({
                              ...prev,
                              value: e.target.value,
                            }))
                          }
                        />
                        <Button
                          onClick={addCustomVariable}
                          disabled={!customVar.key || !customVar.value}
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    {/* Current Variables */}
                    <div className="space-y-2">
                      <h4 className="font-medium">Current Variables</h4>
                      {Object.keys(config.customVariables || {}).length ===
                      0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No custom variables defined
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {Object.entries(config.customVariables || {}).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between bg-muted/30 rounded p-3"
                              >
                                <div className="flex-1 min-w-0">
                                  <code className="text-sm font-mono">
                                    {key}
                                  </code>
                                  <span className="mx-2 text-muted-foreground">
                                    =
                                  </span>
                                  <span className="text-sm">{value}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeCustomVariable(key)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Footer Actions */}
          <div className="border-t p-6 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={!hasChanges}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
