"use client";

import { useState } from "react";
import { useWorkspace } from "../hooks/useWorkspace";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SaveWorkspaceButton() {
  const [open, setOpen] = useState(false);
  const { saveWorkspace, currentWorkspaceName, loading } = useWorkspace();
  const [name, setName] = useState(currentWorkspaceName);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    await saveWorkspace(trimmed);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (val) setName(currentWorkspaceName);
    }}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 text-xs font-semibold"
        >
          <Save className="size-4" />
          Save
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">Save Workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="workspace-name" className="text-xs">
              Workspace Name
            </Label>
            <Input
              id="workspace-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter workspace name..."
              className="text-xs h-9"
              maxLength={30}
              required
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="text-xs h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={loading || !name.trim()}
              className="text-xs h-9 gap-1.5"
            >
              {loading && <Spinner className="size-3.5" />}
              Save Workspace
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
