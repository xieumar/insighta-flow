import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GENDER_OPTIONS, CATEGORY_OPTIONS, FIELD_OPTIONS } from "../constants";
import { RuleField } from "@/types";

interface ValueInputProps {
  field: RuleField;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export function ValueInput({ field, value, onChange, disabled }: ValueInputProps) {
  const fieldConfig = FIELD_OPTIONS.find((opt) => opt.value === field);
  const fieldType = fieldConfig?.type || "string";

  if (field === "gender") {
    return (
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-[180px] h-9 text-xs">
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
        <SelectTrigger className="w-[180px] h-9 text-xs">
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
        className="w-[180px] h-9 text-xs"
      />
    );
  }

  if (fieldType === "number") {
    return (
      <Input
        type="number"
        placeholder="Value"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-[180px] h-9 text-xs"
      />
    );
  }

  return (
    <Input
      type="text"
      placeholder="Value"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-[180px] h-9 text-xs"
    />
  );
}
