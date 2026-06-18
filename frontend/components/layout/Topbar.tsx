"use client";

import { useTheme } from "next-themes";
import { BarChart3, Moon, Play, Sun, UploadCloud, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropZone, IngestionSummary, useUpload } from "@/modules/upload";
import { useWorkspaceStore } from "@/store";
import { useState } from "react";
import { useQueryExecution } from "@/modules/results";
import { WorkspaceBadge, SaveWorkspaceButton, LoadWorkspaceModal } from "@/modules/workspace";
import { useTour } from "@/modules/tour";

interface TopbarProps {
  onRunQuery?: () => void;
  queryLoading?: boolean;
}

export function Topbar({ onRunQuery, queryLoading }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const datasetId = useWorkspaceStore((state) => state.datasetId);
  const { status, metrics } = useUpload();
  const [open, setOpen] = useState(false);
  const { runQuery, loading: executionLoading, isValid } = useQueryExecution();

  const isLoading = queryLoading !== undefined ? queryLoading : executionLoading;
  const isButtonDisabled = isLoading || !isValid;
  const handleRunQuery = onRunQuery || (() => runQuery());

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
      <div className="flex items-center gap-2" id="tour-logo">
        <BarChart3 className="size-5 text-primary" />
        <span className="font-semibold tracking-tight text-foreground mr-1">Insighta Flow</span>
        <WorkspaceBadge />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <LoadWorkspaceModal />
        <SaveWorkspaceButton />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button id="tour-import" variant="outline" size="sm" className="h-9 gap-1.5 text-xs font-semibold">
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
                }} />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {datasetId && (
          <Button
            id="tour-run-query"
            size="sm"
            onClick={handleRunQuery}
            disabled={isButtonDisabled}
            className="h-9 gap-1.5 text-xs font-bold shadow-md shadow-primary/10"
          >
            <Play className="size-3.5 fill-current" />
            {isLoading ? "Running..." : "Run Query"}
          </Button>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => useTour.getState().start()}
                aria-label="Take a tour"
                className="size-9"
              >
                <HelpCircle className="size-4 text-muted-foreground hover:text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Take a tour</TooltipContent>
          </Tooltip>
        </TooltipProvider>

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
