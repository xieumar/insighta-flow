import { create } from "zustand";
import { QueryGroup, QueryRule, QueryNode, RuleField, RuleOperator } from "../types";

interface QueryActions {
  setQuery: (query: QueryGroup) => void;
  updateCombinator: (groupId: string, combinator: "AND" | "OR") => void;
  addRule: (groupId: string) => void;
  updateRule: (ruleId: string, updates: Partial<QueryRule>) => void;
  removeNode: (parentGroupId: string, nodeId: string) => void;
  addGroup: (groupId: string) => void;
  resetQuery: () => void;
}

const createDefaultRule = (): QueryRule => ({
  id: Math.random().toString(36).substring(2, 9),
  type: "rule",
  field: "age",
  operator: "equals",
  value: "",
});

const createDefaultGroup = (combinator: "AND" | "OR" = "AND"): QueryGroup => ({
  id: Math.random().toString(36).substring(2, 9),
  type: "group",
  combinator,
  rules: [],
});

const defaultInitialQuery = (): QueryGroup => {
  const root = createDefaultGroup("AND");
  root.rules.push(createDefaultRule());
  return root;
};

// Helper function to recursively modify nodes in the query tree
const updateNodeInTree = (
  root: QueryGroup,
  targetId: string,
  updater: (node: QueryNode) => QueryNode
): QueryGroup => {
  if (root.id === targetId) {
    return updater(root) as QueryGroup;
  }

  const updatedRules = root.rules.map((rule) => {
    if (rule.id === targetId) {
      return updater(rule);
    }
    if (rule.type === "group") {
      return updateNodeInTree(rule, targetId, updater);
    }
    return rule;
  });

  return { ...root, rules: updatedRules };
};

export const useQueryStore = create< { query: QueryGroup } & QueryActions>((set) => ({
  query: defaultInitialQuery(),

  setQuery: (query) => set({ query }),

  updateCombinator: (groupId, combinator) =>
    set((state) => ({
      query: updateNodeInTree(state.query, groupId, (node) => {
        if (node.type === "group") {
          return { ...node, combinator };
        }
        return node;
      }),
    })),

  addRule: (groupId) =>
    set((state) => ({
      query: updateNodeInTree(state.query, groupId, (node) => {
        if (node.type === "group") {
          return {
            ...node,
            rules: [...node.rules, createDefaultRule()],
          };
        }
        return node;
      }),
    })),

  updateRule: (ruleId, updates) =>
    set((state) => ({
      query: updateNodeInTree(state.query, ruleId, (node) => {
        if (node.type === "rule") {
          return { ...node, ...updates };
        }
        return node;
      }),
    })),

  removeNode: (parentGroupId, nodeId) =>
    set((state) => ({
      query: updateNodeInTree(state.query, parentGroupId, (node) => {
        if (node.type === "group") {
          return {
            ...node,
            rules: node.rules.filter((rule) => rule.id !== nodeId),
          };
        }
        return node;
      }),
    })),

  addGroup: (groupId) =>
    set((state) => ({
      query: updateNodeInTree(state.query, groupId, (node) => {
        if (node.type === "group") {
          const newGroup = createDefaultGroup("OR");
          newGroup.rules.push(createDefaultRule());
          return {
            ...node,
            rules: [...node.rules, newGroup],
          };
        }
        return node;
      }),
    })),

  resetQuery: () => set({ query: defaultInitialQuery() }),
}));
