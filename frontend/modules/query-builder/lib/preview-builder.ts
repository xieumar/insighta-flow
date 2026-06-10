import { QueryGroup, QueryNode } from "@/types";

export function buildQueryPreview(group: QueryGroup): string {
  if (!group || group.rules.length === 0) {
    return "All users (no active filters)";
  }

  return buildNodePreview(group);
}

function buildNodePreview(node: QueryNode): string {
  if (node.type === "group") {
    if (node.rules.length === 0) return "";
    
    const parts = node.rules
      .map((child) => buildNodePreview(child))
      .filter((str) => str !== "");

    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0];

    return `(${parts.join(` ${node.combinator} `)})`;
  }

  // Node is a rule
  const fieldLabel = node.field.replace("_", " ");
  const opSymbol = getOperatorSymbol(node.operator);
  
  let valDisplay = node.value;
  if (valDisplay === "" || valDisplay === undefined) {
    valDisplay = "___";
  } else if (typeof valDisplay === "string") {
    valDisplay = `"${valDisplay}"`;
  }

  return `${fieldLabel} ${opSymbol} ${valDisplay}`;
}

function getOperatorSymbol(op: string): string {
  switch (op) {
    case "equals":
      return "=";
    case "not_equals":
      return "!=";
    case "greater_than":
      return ">";
    case "less_than":
      return "<";
    case "greater_than_or_equals":
      return ">=";
    case "less_than_or_equals":
      return "<=";
    case "contains":
      return "contains";
    default:
      return op;
  }
}
