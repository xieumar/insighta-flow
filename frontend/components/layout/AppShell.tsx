"use client";

import { useState } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

import { useWorkspaceStore } from "@/store";
import { FIELD_OPTIONS } from "@/modules/query-builder/constants";

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const datasetId = useWorkspaceStore((state) => state.datasetId);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <Topbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          {datasetId ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Dataset Fields
                </h3>
                <div className="space-y-1">
                  {FIELD_OPTIONS.map((opt) => (
                    <div
                      key={opt.value}
                      className="flex justify-between items-center text-xs p-2 rounded hover:bg-muted/30 text-foreground"
                    >
                      <span className="font-medium text-foreground/80">{opt.label}</span>
                      <span className="text-[9px] bg-muted px-1.5 py-0.5 rounded font-mono text-muted-foreground uppercase">
                        {opt.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Upload a dataset to start building queries.
            </p>
          )}
        </Sidebar>
        <main className="flex-1 overflow-y-auto bg-background focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
