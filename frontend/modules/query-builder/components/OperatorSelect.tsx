import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OPERATOR_OPTIONS, FIELD_OPTIONS } from "../constants";
import { RuleField, RuleOperator } from "@/types";

interface OperatorSelectProps {
  field: RuleField;
  value: RuleOperator;
  onChange: (value: RuleOperator) => void;
}

export function OperatorSelect({ field, value, onChange }: OperatorSelectProps) {
  const fieldConfig = FIELD_OPTIONS.find((opt) => opt.value === field);
  const fieldType = fieldConfig?.type || "string";

  const applicableOperators = OPERATOR_OPTIONS.filter((opt) =>
    opt.applicableTypes.includes(fieldType)
  );

  const disabled = !field;

  return (
    <Select value={disabled ? undefined : value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[160px] h-9 text-xs">
        <SelectValue placeholder="Operator..." />
      </SelectTrigger>
      <SelectContent>
        {applicableOperators.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="text-xs">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
