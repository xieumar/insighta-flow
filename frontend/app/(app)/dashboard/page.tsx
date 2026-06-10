"use client";

import { useWorkspaceStore } from "@/store";
import { QueryBuilder } from "@/modules/query-builder";
import { Button } from "@/components/ui/button";
import { Database, Sparkles, UploadCloud } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropZone, IngestionSummary, useUpload } from "@/modules/upload";
import { useState } from "react";
import { ResultsTable } from "@/modules/results";

export default function DashboardPage() {
  const datasetId = useWorkspaceStore((state) => state.datasetId);
  const { status, metrics } = useUpload();
  const [importOpen, setImportOpen] = useState(false);

  return (
    <div className="flex-1 p-6 md:p-8">
      {datasetId ? (
        <div className="space-y-6">
          <QueryBuilder />
          <ResultsTable />
        </div>
      ) : (
        /* Empty State with dialog trigger to Import */
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
  );
}
