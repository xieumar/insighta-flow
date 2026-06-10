export type RuleField = "age" | "gender" | "country" | "income" | "purchased_category" | "created_at";

export type RuleOperator = 
  | "equals" 
  | "not_equals" 
  | "greater_than" 
  | "less_than" 
  | "greater_than_or_equals" 
  | "less_than_or_equals" 
  | "contains";

export interface QueryRule {
  type: "rule";
  field: RuleField;
  operator: RuleOperator;
  value: any;
}

export interface QueryGroup {
  type: "group";
  combinator: "AND" | "OR";
  rules: (QueryRule | QueryGroup)[];
}

export type QueryNode = QueryRule | QueryGroup;

export interface QueryRequest {
  query: QueryGroup;
  limit?: number;
  offset?: number;
}

export interface QueryResponse {
  results: any[];
  total: number;
  limit: number;
  offset: number;
}
