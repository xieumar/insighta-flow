"use client";

import { useQueryStore } from "@/store";
import { buildQueryPreview } from "../lib/preview-builder";
import { Terminal } from "lucide-react";

export function QueryPreview() {
  const query = useQueryStore((state) => state.query);
  const previewText = buildQueryPreview(query);

  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4 shadow-inner">
      <div className="flex items-center gap-2 mb-2">
        <Terminal className="size-4 text-primary" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Query Live Preview
        </span>
      </div>
      <pre className="text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap leading-relaxed py-1 px-2 rounded bg-card border border-border/40">
        {previewText}
      </pre>
    </div>
  );
}
