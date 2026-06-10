import { prisma } from "../lib/prisma";
import { WorkspaceSaveInput, WorkspaceResponse } from "../types/workspace.types";

export async function saveWorkspace(data: WorkspaceSaveInput): Promise<WorkspaceResponse> {
  const workspace = await prisma.workspace.create({
    data: {
      name: data.name || "Untitled Workspace",
      query_tree: data.query_tree as any,
      dataset_id: data.dataset_id || null,
    },
  });

  return workspace;
}

export async function getWorkspaceById(id: string): Promise<WorkspaceResponse | null> {
  const workspace = await prisma.workspace.findUnique({
    where: { id },
  });

  return workspace;
}

export async function getAllWorkspaces(): Promise<WorkspaceResponse[]> {
  const workspaces = await prisma.workspace.findMany({
    orderBy: {
      updated_at: "desc",
    },
  });

  return workspaces;
}

export async function deleteWorkspaceById(id: string): Promise<boolean> {
  try {
    await prisma.workspace.delete({
      where: { id },
    });
    return true;
  } catch {
    return false;
  }
}
