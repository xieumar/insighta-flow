"use client";

import { useTheme } from "next-themes";
import { BarChart3, Database, Menu, Moon, Play, Sun, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropZone, IngestionSummary, useUpload } from "@/modules/upload";
import { useWorkspaceStore } from "@/store";
import { useState } from "react";

interface TopbarProps {
  onMenuClick?: () => void;
  onRunQuery?: () => void;
  queryLoading?: boolean;
}

export function Topbar({ onMenuClick, onRunQuery, queryLoading }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const datasetId = useWorkspaceStore((state) => state.datasetId);
  const { status, metrics } = useUpload();
  const [open, setOpen] = useState(false);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
        id="tour-menu-btn"
      >
        <Menu />
      </Button>

      <div className="flex items-center gap-2" id="tour-logo">
        <BarChart3 className="size-5 text-primary" />
        <span className="font-semibold tracking-tight text-foreground">Insighta Flow</span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {/* Import Modal Button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs font-semibold">
              <UploadCloud className="size-4" />
              {datasetId ? "Change Dataset" : "Import"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-center font-bold">
                Import Demographic Dataset
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {status === "success" && metrics ? (
                <IngestionSummary />
              ) : (
                <DropZone onSuccess={() => {
                  // Keep open to show results summary
                }} />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Run Query Button */}
        {datasetId && (
          <Button
            size="sm"
            onClick={onRunQuery}
            disabled={queryLoading}
            className="h-9 gap-1.5 text-xs font-bold shadow-md shadow-primary/10"
          >
            <Play className="size-3.5 fill-current" />
            {queryLoading ? "Running..." : "Run Query"}
          </Button>
        )}

        {/* Theme Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                id="tour-theme-toggle"
                className="size-9"
              >
                <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle theme</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
}
