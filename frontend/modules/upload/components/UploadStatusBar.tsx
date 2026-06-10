import { cn } from "@/lib/utils";

interface UploadStatusBarProps {
  value: number;
  className?: string;
}

export function UploadStatusBar({ value, className }: UploadStatusBarProps) {
  const percent = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <div className="flex justify-between text-xs font-medium text-muted-foreground">
        <span>Uploading dataset...</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all duration-350 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
