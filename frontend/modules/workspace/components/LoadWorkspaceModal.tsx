"use client";

import { useState, useEffect } from "react";
import { useWorkspace } from "../hooks/useWorkspace";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderOpen, Trash2, Calendar, FileText, AlertTriangle, ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface WorkspaceItem {
  id: string;
  name: string;
  dataset_id: string | null;
  created_at: string;
  updated_at: string;
}

export function LoadWorkspaceModal() {
  const [open, setOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const { listWorkspaces, loadWorkspace, deleteWorkspace, loading } = useWorkspace();
  const [view, setView] = useState<"list" | "delete-confirm">("list");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchWorkspaces = async () => {
    setLoadingList(true);
    const data = await listWorkspaces();
    setWorkspaces(data);
    setLoadingList(false);
  };

  useEffect(() => {
    if (open) {
      setView("list");
      setDeleteId(null);
      fetchWorkspaces();
    }
  }, [open]);

  const handleLoad = async (id: string) => {
    await loadWorkspace(id);
    setOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteWorkspace(deleteId);
    setDeleteId(null);
    setView("list");
    fetchWorkspaces();
  };

  const selectedWorkspace = workspaces.find((ws) => ws.id === deleteId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs font-semibold">
          <FolderOpen className="size-4" />
          Open
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {view === "list" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center font-bold">Open Saved Workspace</DialogTitle>
            </DialogHeader>

            <div className="py-4 max-h-[300px] overflow-y-auto space-y-2 pr-1">
              {loadingList ? (
                <div className="flex items-center justify-center py-8">
                  <Spinner className="size-6 text-primary" />
                </div>
              ) : workspaces.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No saved workspaces found.
                </div>
              ) : (
                workspaces.map((ws) => (
                  <div
                    key={ws.id}
                    onClick={() => handleLoad(ws.id)}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50 hover:bg-muted/40 cursor-pointer transition-colors group"
                  >
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                        {ws.name}
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {new Date(ws.updated_at).toLocaleDateString()}
                        </span>
                        {ws.dataset_id && (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500 font-medium">
                            <FileText className="size-3" />
                            Dataset Attached
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={loading}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(ws.id);
                        setView("delete-confirm");
                      }}
                      className="size-7 rounded-full text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 shrink-0"
                      aria-label="Delete workspace"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-destructive/10 p-3 mb-2 text-destructive animate-pulse">
                <AlertTriangle className="size-6" />
              </div>
              <DialogTitle className="font-bold text-base">Delete Workspace</DialogTitle>
            </DialogHeader>

            <div className="text-center py-4 space-y-2">
              <p className="text-xs text-muted-foreground">
                Are you sure you want to delete the workspace <span className="font-semibold text-foreground">"{selectedWorkspace?.name}"</span>?
              </p>
              <p className="text-[10px] text-destructive/80 font-medium">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setView("list");
                  setDeleteId(null);
                }}
                className="text-xs h-9 gap-1.5"
              >
                <ArrowLeft className="size-3.5" />
                Back
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={confirmDelete}
                disabled={loading}
                className="text-xs h-9 font-semibold"
              >
                {loading ? <Spinner className="size-3.5" /> : "Delete Workspace"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
