"use client";

import { useWorkspaceStore } from "@/store";
import { QueryBuilder } from "@/modules/query-builder";
import { Button } from "@/components/ui/button";
import { Database, UploadCloud } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropZone, IngestionSummary, useUpload } from "@/modules/upload";
import { useState } from "react";
import { ResultsTable } from "@/modules/results";
import { useDatasetStore } from "@/store/dataset.store";
import {
  IncomeByCategory,
  GenderDistribution,
  AgeHistogram,
  PurchasesOverTime,
} from "@/modules/charts";

export default function DashboardPage() {
  const datasetId = useWorkspaceStore((state) => state.datasetId);
  const { status, metrics } = useUpload();
  const [importOpen, setImportOpen] = useState(false);
  const { results, loading } = useDatasetStore();
  const [activeTab, setActiveTab] = useState<"table" | "charts">("table");

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        {datasetId ? (
          <div className="space-y-8 pb-12">
            <QueryBuilder />
            
            <div className="space-y-6">
              <div className="flex gap-2 border-b border-border">
                <button
                  id="tour-tab-results"
                  onClick={() => setActiveTab("table")}
                  className={`pb-3 text-sm font-semibold border-b-2 px-4 transition-all cursor-pointer -mb-[2px] ${
                    activeTab === "table"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Results
                </button>
                <button
                  id="tour-tab-analytics"
                  onClick={() => setActiveTab("charts")}
                  className={`pb-3 text-sm font-semibold border-b-2 px-4 transition-all cursor-pointer -mb-[2px] ${
                    activeTab === "charts"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Analytics
                </button>
              </div>

              {activeTab === "table" ? (
                <ResultsTable />
              ) : !loading && results.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-dashed border-border rounded-xl p-12 text-center bg-card/25 backdrop-blur-sm">
                  <div className="rounded-full bg-primary/10 p-3 mb-3 text-primary animate-pulse">
                    <Database className="size-6" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    No analytical insights available
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs mb-4">
                    Build and run a query using the workspace controls above to fetch demographic profiles.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold tracking-tight text-foreground">Demographic Insights</h2>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <IncomeByCategory data={results} loading={loading} />
                    <GenderDistribution data={results} loading={loading} />
                    <AgeHistogram data={results} loading={loading} />
                    <PurchasesOverTime data={results} loading={loading} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[50dvh] flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border rounded-xl bg-card/25 max-w-lg mx-auto mt-12">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <Database className="size-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">No active dataset</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto mb-6">
              To start building queries and visualizing demographic charts, please import a CSV dataset.
            </p>
            
            <Dialog open={importOpen} onOpenChange={setImportOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-lg shadow-primary/20">
                  <UploadCloud className="mr-2 size-4" /> Import CSV File
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle className="text-center font-bold">Import Demographic Dataset</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  {status === "success" && metrics ? (
                    <div className="space-y-4">
                      <IngestionSummary />
                      <div className="flex justify-center">
                        <Button onClick={() => setImportOpen(false)} className="w-full">
                          Go to Query Workspace
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <DropZone />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
