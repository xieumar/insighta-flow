"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { useUpload } from "../hooks/useUpload";
import { UploadStatusBar } from "./UploadStatusBar";
import { AlertCircle, FileSpreadsheet, UploadCloud } from "lucide-react";
import { toast } from "sonner";

interface DropZoneProps {
  onSuccess?: () => void;
}

export function DropZone({ onSuccess }: DropZoneProps) {
  const { uploadFile, status, progress, error: uploadError } = useUpload();
  const [localError, setLocalError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLocalError(null);
      const file = acceptedFiles[0];

      if (!file) return;

      // 100MB limit (100 * 1024 * 1024 bytes)
      const MAX_SIZE = 100 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        const sizeError = "File is too large. Maximum size allowed is 100MB.";
        setLocalError(sizeError);
        toast.error(sizeError);
        return;
      }

      if (!file.name.toLowerCase().endsWith(".csv")) {
        const typeError = "Invalid file type. Only CSV files are allowed.";
        setLocalError(typeError);
        toast.error(typeError);
        return;
      }

      try {
        await uploadFile(file);
        toast.success("File uploaded and ingested successfully!");
        onSuccess?.();
      } catch (err: any) {
        toast.error(err.message || "Failed to upload file.");
      }
    },
    [uploadFile, onSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "text/csv": [".csv"],
    },
    disabled: status === "uploading",
  });

  const activeError = localError || uploadError;

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer transition-all duration-200 select-none",
          isDragActive && "border-primary bg-primary/5",
          status === "uploading" && "opacity-60 cursor-not-allowed border-muted",
          "hover:border-primary/50 hover:bg-card/50"
        )}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            "flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200",
            isDragActive && "bg-primary/15 text-primary scale-110"
          )}>
            {status === "uploading" ? (
              <FileSpreadsheet className="size-6 animate-pulse text-primary" />
            ) : (
              <UploadCloud className="size-6" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              {isDragActive
                ? "Drop the CSV file here..."
                : "Drag & drop your CSV file here, or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground">
              CSV spreadsheets up to 100MB are supported
            </p>
          </div>
        </div>
      </div>

      {status === "uploading" && (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <UploadStatusBar value={progress} />
        </div>
      )}

      {activeError && (
        <div className="flex items-start gap-3 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold">Upload failed</span>
            <p className="text-destructive/90">{activeError}</p>
          </div>
        </div>
      )}
    </div>
  );
}
