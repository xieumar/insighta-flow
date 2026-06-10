import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GENDER_OPTIONS, CATEGORY_OPTIONS, FIELD_OPTIONS } from "../constants";
import { RuleField } from "@/types";

interface ValueInputProps {
  field: RuleField;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  hasError?: boolean;
}

export function ValueInput({ field, value, onChange, disabled, hasError }: ValueInputProps) {
  if (!field) return null;

  const fieldConfig = FIELD_OPTIONS.find((opt) => opt.value === field);
  const fieldType = fieldConfig?.type || "string";

  if (field === "gender") {
    return (
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={`w-[180px] h-9 text-xs ${hasError ? "border-destructive focus:ring-destructive" : ""}`}>
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          {GENDER_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (field === "purchased_category") {
    return (
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={`w-[180px] h-9 text-xs ${hasError ? "border-destructive focus:ring-destructive" : ""}`}>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORY_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (fieldType === "date") {
    return (
      <Input
        type="date"
        value={value ? String(value).split("T")[0] : ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-[180px] h-9 text-xs ${hasError ? "border-destructive focus-visible:ring-destructive" : ""}`}
      />
    );
  }

  if (fieldType === "number") {
    return (
      <Input
        type="number"
        placeholder="Enter number..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-[180px] h-9 text-xs ${hasError ? "border-destructive focus-visible:ring-destructive" : ""}`}
      />
    );
  }

  return (
    <Input
      type="text"
      placeholder="Enter value..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-[180px] h-9 text-xs ${hasError ? "border-destructive focus-visible:ring-destructive" : ""}`}
    />
  );
}
