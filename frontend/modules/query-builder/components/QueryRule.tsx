"use client";

import { useQueryStore } from "@/store";
import { FieldSelect } from "./FieldSelect";
import { OperatorSelect } from "./OperatorSelect";
import { ValueInput } from "./ValueInput";
import { Button } from "@/components/ui/button";
import { QueryRule as IQueryRule, RuleField, RuleOperator } from "@/types";
import { Trash2 } from "lucide-react";

interface QueryRuleProps {
  rule: IQueryRule;
  parentGroupId: string;
}

export function QueryRule({ rule, parentGroupId }: QueryRuleProps) {
  const updateRule = useQueryStore((state) => state.updateRule);
  const removeNode = useQueryStore((state) => state.removeNode);

  const handleFieldChange = (field: RuleField) => {
    // Reset operator and value when field changes to avoid mismatching types
    updateRule(rule.id, {
      field,
      operator: "equals",
      value: "",
    });
  };

  const handleOperatorChange = (operator: RuleOperator) => {
    updateRule(rule.id, { operator });
  };

  const handleValueChange = (value: any) => {
    updateRule(rule.id, { value });
  };

  return (
    <div className="flex items-center gap-2 py-1 flex-wrap md:flex-nowrap">
      <FieldSelect value={rule.field} onChange={handleFieldChange} />
      <OperatorSelect field={rule.field} value={rule.operator} onChange={handleOperatorChange} />
      <ValueInput field={rule.field} value={rule.value} onChange={handleValueChange} />
      
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        onClick={() => removeNode(parentGroupId, rule.id)}
        aria-label="Delete rule"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
