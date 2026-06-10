import { Button } from "@/components/ui/button";

interface OperatorToggleProps {
  value: "AND" | "OR";
  onChange: (value: "AND" | "OR") => void;
}

export function OperatorToggle({ value, onChange }: OperatorToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5 shadow-sm">
      <Button
        type="button"
        variant={value === "AND" ? "default" : "ghost"}
        size="sm"
        className="h-7 px-3 text-xs font-semibold"
        onClick={() => onChange("AND")}
      >
        AND
      </Button>
      <Button
        type="button"
        variant={value === "OR" ? "default" : "ghost"}
        size="sm"
        className="h-7 px-3 text-xs font-semibold"
        onClick={() => onChange("OR")}
      >
        OR
      </Button>
    </div>
  );
}
