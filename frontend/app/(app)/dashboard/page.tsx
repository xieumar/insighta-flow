"use client";

import { Database, FileSpreadsheet, Layers, Play, Settings2, Sparkles, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-6 md:p-8">
      {/* Welcome Hero banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-transparent p-6 md:p-8">
        <div className="absolute right-6 top-6 size-12 rounded-full bg-primary/10 blur-xl" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/20 border-primary/20">
            <Sparkles className="mr-1 size-3.5 fill-primary" /> Ready to Analyze
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Welcome to Insighta Flow
          </h1>
          <p className="text-muted-foreground">
            A full-stack demographic analytics workspace. Upload your dataset, use the visual query builder to segment users, and visualize results instantly.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="default" className="shadow-lg shadow-primary/20">
              <Database className="mr-2 size-4" /> Upload Dataset
            </Button>
            <Button variant="outline" size="default">
              <Play className="mr-2 size-4" /> Try Demo Flow
            </Button>
          </div>
        </div>
      </div>

      {/* Grid of quick stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Rows Ingested</span>
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <FileSpreadsheet className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold">0</span>
            <span className="ml-2 text-xs text-muted-foreground">— No active dataset</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Active Queries</span>
            <div className="rounded-lg bg-chart-1/10 p-2 text-chart-1">
              <Layers className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold">0</span>
            <span className="ml-2 text-xs text-muted-foreground">— Empty tree</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Matched Cohort</span>
            <div className="rounded-lg bg-chart-2/10 p-2 text-chart-2">
              <Users className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold">0%</span>
            <span className="ml-2 text-xs text-muted-foreground">— Target group</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Workspace Status</span>
            <div className="rounded-lg bg-chart-3/10 p-2 text-chart-3">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold">Unsaved</span>
            <span className="ml-2 text-xs text-muted-foreground">— Local only</span>
          </div>
        </div>
      </div>

      {/* Main Workspace empty state mockup */}
      <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
          <Settings2 className="size-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Start building your pipeline</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Please upload a CSV file with columns like Age, Gender, Income, and Purchase Date to enable query filtering and charting.
        </p>
        <Button variant="outline" className="mt-6">
          Learn how to structure your CSV
        </Button>
      </div>
    </div>
  );
}
