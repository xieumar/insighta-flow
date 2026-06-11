"use client";

import { useState } from "react";
import { useWorkspace } from "../hooks/useWorkspace";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export function SaveWorkspaceButton() {
  const { saveWorkspace, currentWorkspaceName, loading } = useWorkspace();

  const handleSave = async () => {
    await saveWorkspace(currentWorkspaceName);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSave}
      disabled={loading}
      className="h-9 gap-1.5 text-xs font-semibold"
    >
      {loading ? (
        <Spinner className="size-3.5" />
      ) : (
        <Save className="size-4" />
      )}
      Save
    </Button>
  );
}
