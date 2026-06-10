import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkspaceState {
  currentWorkspaceId: string | null;
  currentWorkspaceName: string;
  datasetId: string | null;
  setWorkspaceId: (id: string | null) => void;
  setWorkspaceName: (name: string) => void;
  setDatasetId: (id: string | null) => void;
  resetWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      currentWorkspaceId: null,
      currentWorkspaceName: "Untitled Workspace",
      datasetId: null,

      setWorkspaceId: (id) => set({ currentWorkspaceId: id }),
      setWorkspaceName: (name) => set({ currentWorkspaceName: name }),
      setDatasetId: (id) => set({ datasetId: id }),
      resetWorkspace: () =>
        set({
          currentWorkspaceId: null,
          currentWorkspaceName: "Untitled Workspace",
          datasetId: null,
        }),
    }),
    {
      name: "insighta-workspace-storage",
    }
  )
);
