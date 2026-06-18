"use client";

import { Topbar } from "./Topbar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden bg-background focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
