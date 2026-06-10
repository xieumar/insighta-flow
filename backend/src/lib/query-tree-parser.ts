import { QueryGroup, QueryNode, QueryRule, RuleField, RuleOperator } from "../types/query.types";

const ALLOWED_FIELDS: Set<RuleField> = new Set([
  "age",
  "gender",
  "country",
  "income",
  "purchased_category",
  "created_at",
]);

const ALLOWED_OPERATORS: Set<RuleOperator> = new Set([
  "equals",
  "not_equals",
  "greater_than",
  "less_than",
  "greater_than_or_equals",
  "less_than_or_equals",
  "contains",
]);

export function parseQueryTree(group: QueryGroup): any {
  if (!group || group.type !== "group") {
    throw new Error("Invalid query root: Must be a group");
  }

  return parseGroup(group);
}

function parseGroup(group: QueryGroup): any {
  if (group.combinator !== "AND" && group.combinator !== "OR") {
    throw new Error(`Unsupported combinator: ${group.combinator}`);
  }

  const subConditions = group.rules.map((rule) => parseNode(rule));

  if (subConditions.length === 0) {
    return {};
  }

  return {
    [group.combinator]: subConditions,
  };
}

function parseNode(node: QueryNode): any {
  if (node.type === "group") {
    return parseGroup(node);
  }

  if (node.type === "rule") {
    return parseRule(node);
  }

  throw new Error(`Unknown query node type: ${(node as any).type}`);
}

function parseRule(rule: QueryRule): any {
  if (!ALLOWED_FIELDS.has(rule.field)) {
    throw new Error(`Unsupported query field: ${rule.field}`);
  }

  if (!ALLOWED_OPERATORS.has(rule.operator)) {
    throw new Error(`Unsupported operator: ${rule.operator}`);
  }

  let value = rule.value;

  // Type coercions/sanitizations based on field type
  if (rule.field === "age") {
    value = parseInt(value, 10);
    if (isNaN(value)) throw new Error("Invalid value for age: must be an integer");
  } else if (rule.field === "income") {
    value = parseFloat(value);
    if (isNaN(value)) throw new Error("Invalid value for income: must be a number");
  } else if (rule.field === "created_at") {
    const date = new Date(value);
    if (isNaN(date.getTime())) throw new Error("Invalid value for created_at: must be a valid date");
    value = date;
  }

  switch (rule.operator) {
    case "equals":
      return { [rule.field]: { equals: value } };
    case "not_equals":
      return { [rule.field]: { not: value } };
    case "greater_than":
      return { [rule.field]: { gt: value } };
    case "less_than":
      return { [rule.field]: { lt: value } };
    case "greater_than_or_equals":
      return { [rule.field]: { gte: value } };
    case "less_than_or_equals":
      return { [rule.field]: { lte: value } };
    case "contains":
      if (typeof value !== "string") {
        throw new Error("Contains operator can only be used with string values");
      }
      return { [rule.field]: { contains: value, mode: "insensitive" } };
    default:
      throw new Error(`Unhandled operator: ${rule.operator}`);
  }
}
