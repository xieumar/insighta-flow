import { useState } from "react";
import { toast } from "sonner";
import { useWorkspaceStore } from "@/store/workspace.store";
import { useQueryStore } from "@/store/query.store";
import { useQueryExecution } from "@/modules/results/hooks/useQueryExecution";
import { apiFetch } from "@/lib/api-client";

export function useWorkspace() {
  const [loading, setLoading] = useState(false);
  const {
    currentWorkspaceId,
    currentWorkspaceName,
    datasetId,
    setWorkspaceId,
    setWorkspaceName,
    setDatasetId,
    resetWorkspace,
  } = useWorkspaceStore();

  const { setQuery } = useQueryStore();
  const { runQuery } = useQueryExecution();

  const saveWorkspace = async (name: string) => {
    setLoading(true);
    try {
      const query = useQueryStore.getState().query;
      const response = await apiFetch("/api/workspace", {
        method: "POST",
        body: JSON.stringify({
          name: name || "Untitled Workspace",
          query_tree: query,
          dataset_id: datasetId,
        }),
      });

      setWorkspaceId(response.id);
      setWorkspaceName(response.name);
      toast.success("Workspace saved successfully", { position: "top-right" });
      return response;
    } catch (err: any) {
      toast.error(err.message || "Failed to save workspace", { position: "top-right" });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadWorkspace = async (id: string) => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/workspace/${id}`);
      
      setWorkspaceId(response.id);
      setWorkspaceName(response.name);
      setDatasetId(response.dataset_id);
      
      if (response.query_tree) {
        setQuery(response.query_tree);
      }

      toast.success("Workspace loaded successfully", { position: "top-right" });
      
      if (response.dataset_id) {
        setTimeout(() => {
          runQuery();
        }, 100);
      }
      return response;
    } catch (err: any) {
      toast.error(err.message || "Failed to load workspace", { position: "top-right" });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkspace = async (id: string) => {
    try {
      await apiFetch(`/api/workspace/${id}`, {
        method: "DELETE",
      });

      if (currentWorkspaceId === id) {
        resetWorkspace();
      }
      toast.success("Workspace deleted successfully", { position: "top-right" });
    } catch (err: any) {
      toast.error(err.message || "Failed to delete workspace", { position: "top-right" });
      throw err;
    }
  };

  const listWorkspaces = async () => {
    try {
      return await apiFetch("/api/workspace");
    } catch (err: any) {
      toast.error(err.message || "Failed to list workspaces", { position: "top-right" });
      return [];
    }
  };

  return {
    loading,
    currentWorkspaceId,
    currentWorkspaceName,
    saveWorkspace,
    loadWorkspace,
    deleteWorkspace,
    listWorkspaces,
  };
}
