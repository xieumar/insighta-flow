"use client";

import { useQueryStore } from "@/store";
import { QueryGroup as IQueryGroup, QueryNode } from "@/types";
import { OperatorToggle } from "./OperatorToggle";
import { QueryRule } from "./QueryRule";
import { Button } from "@/components/ui/button";
import { FolderPlus, Plus, Trash2 } from "lucide-react";

interface QueryGroupProps {
  group: IQueryGroup;
  parentId?: string;
}

export function QueryGroup({ group, parentId }: QueryGroupProps) {
  const updateCombinator = useQueryStore((state) => state.updateCombinator);
  const addRule = useQueryStore((state) => state.addRule);
  const addGroup = useQueryStore((state) => state.addGroup);
  const removeNode = useQueryStore((state) => state.removeNode);

  const isRoot = !parentId;

  return (
    <div className="relative rounded-xl border border-border bg-card/40 p-4 space-y-4 shadow-sm transition-colors hover:bg-card/60">
      {/* Top Header bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <OperatorToggle
            value={group.combinator}
            onChange={(val) => updateCombinator(group.id, val)}
          />
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            Group Rules
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addRule(group.id)}
            className="h-8 text-xs"
          >
            <Plus className="mr-1 size-3.5" /> Add Rule
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addGroup(group.id)}
            className="h-8 text-xs"
          >
            <FolderPlus className="mr-1 size-3.5" /> Add Group
          </Button>
          {!isRoot && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={() => removeNode(parentId, group.id)}
              aria-label="Delete group"
            >
              <Trash2 className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Children Rules List */}
      <div className="space-y-3 pl-2 border-l border-border/80 ml-2">
        {group.rules.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">Empty group. Add rules above.</p>
        ) : (
          group.rules.map((ruleNode: QueryNode) => {
            if (ruleNode.type === "group") {
              return (
                <QueryGroup
                  key={ruleNode.id}
                  group={ruleNode}
                  parentId={group.id}
                />
              );
            }
            return (
              <QueryRule
                key={ruleNode.id}
                rule={ruleNode}
                parentGroupId={group.id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
