"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export function Sidebar({ open, onClose, children }: SidebarProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="tour-query-builder"
        aria-label="Query builder"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-sidebar transition-transform duration-300 md:relative md:inset-auto md:z-auto md:translate-x-0 md:transition-none",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border px-4">
          <span className="text-sm font-semibold text-sidebar-foreground">Query Builder</span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close sidebar"
            className="md:hidden"
          >
            <X />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {children ?? (
            <p className="text-sm text-muted-foreground">
              Upload a dataset to start building queries.
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
