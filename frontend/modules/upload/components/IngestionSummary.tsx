"use client";

import { useUpload } from "../hooks/useUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileWarning, RefreshCw } from "lucide-react";

export function IngestionSummary() {
  const { metrics, reset } = useUpload();

  if (!metrics) return null;

  const hasSkips = metrics.rows_skipped > 0;
  const skipReasonsList = Object.entries(metrics.skip_reasons).filter(
    ([_, count]) => count > 0
  );

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl border border-border bg-card p-6 shadow-md space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-green-500/15 text-green-500">
          <CheckCircle2 className="size-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Ingestion Complete</h3>
          <p className="text-sm text-muted-foreground">
            Your dataset has been parsed and loaded successfully
          </p>
        </div>
      </div>

      {/* High level stats row */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg bg-muted/40 p-3">
          <span className="text-2xl font-bold text-foreground">
            {metrics.total_rows_received.toLocaleString()}
          </span>
          <p className="text-xs text-muted-foreground mt-1">Rows Received</p>
        </div>

        <div className="rounded-lg bg-green-500/10 p-3">
          <span className="text-2xl font-bold text-green-500">
            {metrics.rows_inserted.toLocaleString()}
          </span>
          <p className="text-xs text-muted-foreground mt-1 text-green-500/95">Rows Inserted</p>
        </div>

        <div className="rounded-lg bg-amber-500/10 p-3">
          <span className="text-2xl font-bold text-amber-500">
            {metrics.rows_skipped.toLocaleString()}
          </span>
          <p className="text-xs text-muted-foreground mt-1 text-amber-500/95">Rows Skipped</p>
        </div>
      </div>

      {/* Skipped reasons table/list */}
      {hasSkips && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <FileWarning className="size-4 text-amber-500" />
            <span>Reasons for skipped records:</span>
          </div>
          <div className="rounded-lg border border-border bg-muted/20 overflow-hidden divide-y divide-border">
            {skipReasonsList.map(([reason, count]) => {
              const friendlyName = reason
                .replace("invalid_", "Invalid ")
                .replace("missing_", "Missing ")
                .replace("duplicate", "Duplicate records");

              return (
                <div key={reason} className="flex justify-between items-center px-4 py-2.5 text-sm">
                  <span className="text-foreground/90 font-medium capitalize">{friendlyName}</span>
                  <Badge variant="warning" className="font-mono">
                    {count}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action panel */}
      <div className="flex justify-end pt-2">
        <Button variant="outline" size="sm" onClick={reset}>
          <RefreshCw className="mr-2 size-3.5" /> Upload Another File
        </Button>
      </div>
    </div>
  );
}
