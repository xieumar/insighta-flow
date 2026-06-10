import { RuleField, RuleOperator } from "@/types";

export const FIELD_OPTIONS: { label: string; value: RuleField; type: "number" | "string" | "enum" | "date" }[] = [
  { label: "Age", value: "age", type: "number" },
  { label: "Gender", value: "gender", type: "enum" },
  { label: "Country", value: "country", type: "string" },
  { label: "Income", value: "income", type: "number" },
  { label: "Purchased Category", value: "purchased_category", type: "enum" },
  { label: "Created At", value: "created_at", type: "date" },
];

export const OPERATOR_OPTIONS: { label: string; value: RuleOperator; applicableTypes: string[] }[] = [
  { label: "Equals", value: "equals", applicableTypes: ["string", "number", "enum", "date"] },
  { label: "Not Equals", value: "not_equals", applicableTypes: ["string", "number", "enum", "date"] },
  { label: "Greater Than", value: "greater_than", applicableTypes: ["number", "date"] },
  { label: "Less Than", value: "less_than", applicableTypes: ["number", "date"] },
  { label: "Greater Than or Equal", value: "greater_than_or_equals", applicableTypes: ["number", "date"] },
  { label: "Less Than or Equal", value: "less_than_or_equals", applicableTypes: ["number", "date"] },
  { label: "Contains", value: "contains", applicableTypes: ["string"] },
];

export const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Rather not say", value: "rather not say" },
];

export const CATEGORY_OPTIONS = [
  { label: "Electronics", value: "Electronics" },
  { label: "Clothing", value: "Clothing" },
  { label: "Home", value: "Home" },
  { label: "Books", value: "Books" },
  { label: "Sports", value: "Sports" },
];
