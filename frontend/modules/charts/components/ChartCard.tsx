"use client";

import { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChartCardProps {
  title: string;
  loading?: boolean;
  isEmpty?: boolean;
  onExport?: () => void;
  children: ReactNode;
}

export function ChartCard({ title, loading, isEmpty, onExport, children }: ChartCardProps) {
  return (
    <div className="border border-border bg-card rounded-xl p-5 shadow-sm flex flex-col h-[320px] transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-bold text-foreground tracking-tight">{title}</h3>
        {onExport && !isEmpty && !loading && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onExport}
            className="size-7 text-muted-foreground hover:text-foreground rounded-md"
            aria-label="Export chart data"
          >
            <Download className="size-4" />
          </Button>
        )}
      </div>

      <div className="flex-1 min-h-0 relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col gap-2 justify-center">
            <Skeleton className="w-full h-1/2 rounded-lg" />
            <Skeleton className="w-5/6 h-6 rounded-md" />
            <Skeleton className="w-2/3 h-6 rounded-md" />
          </div>
        ) : isEmpty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-xs text-muted-foreground">No data available for this chart</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
