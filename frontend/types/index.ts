export interface UserProfile {
  id: string;
  full_name: string;
  gender: "male" | "female" | "rather not say";
  age: number;
  country: string;
  income: number;
  purchased_category: "Electronics" | "Clothing" | "Home" | "Books" | "Sports";
  created_at: string;
}

export type RuleField = "age" | "gender" | "country" | "income" | "purchased_category" | "created_at" | "";

export type RuleOperator = 
  | "equals" 
  | "not_equals" 
  | "greater_than" 
  | "less_than" 
  | "greater_than_or_equals" 
  | "less_than_or_equals" 
  | "contains";

export interface QueryRule {
  id: string;
  type: "rule";
  field: RuleField;
  operator: RuleOperator;
  value: any;
}

export interface QueryGroup {
  id: string;
  type: "group";
  combinator: "AND" | "OR";
  rules: (QueryRule | QueryGroup)[];
}

export type QueryNode = QueryRule | QueryGroup;
