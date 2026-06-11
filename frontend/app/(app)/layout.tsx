"use client";

import { AppShell } from "@/components/layout";
import { TourProvider } from "@/modules/tour";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TourProvider>
      <AppShell>{children}</AppShell>
    </TourProvider>
  );
}
