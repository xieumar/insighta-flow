import { QueryNode } from "@/types";

export interface QueryBuilderProps {
  onQueryChange?: (query: any) => void;
}

export interface QueryGroupProps {
  id: string;
  parentId?: string;
  combinator: "AND" | "OR";
  rules: QueryNode[];
}

export interface QueryRuleProps {
  id: string;
  parentGroupId: string;
}
