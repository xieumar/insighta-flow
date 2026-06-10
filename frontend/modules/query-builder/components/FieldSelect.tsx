import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FIELD_OPTIONS } from "../constants";
import { RuleField } from "@/types";

interface FieldSelectProps {
  value: RuleField;
  onChange: (value: RuleField) => void;
}

export function FieldSelect({ value, onChange }: FieldSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[160px] h-9 text-xs">
        <SelectValue placeholder="Select Field" />
      </SelectTrigger>
      <SelectContent>
        {FIELD_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="text-xs">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
