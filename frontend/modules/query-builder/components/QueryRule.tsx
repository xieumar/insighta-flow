"use client";

import { useQueryStore } from "@/store";
import { FieldSelect } from "./FieldSelect";
import { OperatorSelect } from "./OperatorSelect";
import { ValueInput } from "./ValueInput";
import { Button } from "@/components/ui/button";
import { QueryRule as IQueryRule, RuleField, RuleOperator } from "@/types";
import { X } from "lucide-react";

interface QueryRuleProps {
  rule: IQueryRule;
  parentGroupId: string;
}

export function QueryRule({ rule, parentGroupId }: QueryRuleProps) {
  const updateRule = useQueryStore((state) => state.updateRule);
  const removeNode = useQueryStore((state) => state.removeNode);

  const handleFieldChange = (field: RuleField) => {
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

  const getValidationError = () => {
    if (!rule.field) {
      return "Select a field to continue";
    }
    if (rule.value === undefined || rule.value === null || String(rule.value).trim() === "") {
      return "A value is required";
    }
    if (rule.field === "age") {
      const val = parseInt(rule.value, 10);
      if (isNaN(val) || val < 0) {
        return "A valid age is required";
      }
    } else if (rule.field === "income") {
      const val = parseFloat(rule.value);
      if (isNaN(val) || val < 0) {
        return "A valid income is required";
      }
    }
    return null;
  };

  const error = getValidationError();

  return (
    <div className={`p-3 rounded-xl border transition-all ${
      error 
        ? "border-destructive/50 bg-destructive/5 dark:bg-destructive/10" 
        : "border-border bg-card/50 hover:border-muted-foreground/20"
    }`}>
      <div className="flex items-center gap-2 justify-between flex-wrap sm:flex-nowrap">
        <div className="flex-1 flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <FieldSelect value={rule.field} onChange={handleFieldChange} />
          <OperatorSelect field={rule.field} value={rule.operator} onChange={handleOperatorChange} />
          <ValueInput 
            field={rule.field} 
            value={rule.value} 
            onChange={handleValueChange}
            hasError={!!error && rule.field !== ""} 
          />
        </div>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-7 rounded-full text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 shrink-0"
          onClick={() => removeNode(parentGroupId, rule.id)}
          aria-label="Delete rule"
        >
          <X className="size-4" />
        </Button>
      </div>
      
      {error && (
        <div className="mt-2 text-xs font-semibold text-destructive/90 animate-fade-in pl-1">
          {error}
        </div>
      )}
    </div>
  );
}
