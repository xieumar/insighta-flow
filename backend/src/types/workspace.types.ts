import { QueryGroup } from "./query.types";

export interface WorkspaceSaveInput {
  name?: string;
  query_tree: QueryGroup;
  dataset_id?: string;
}

export interface WorkspaceResponse {
  id: string;
  name: string;
  query_tree: any;
  dataset_id: string | null;
  created_at: Date;
  updated_at: Date;
}
